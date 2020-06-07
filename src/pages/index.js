import React, { useEffect } from 'react';
import kebabCase from 'lodash.kebabcase';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Label, Popup } from 'semantic-ui-react';

import { Header, Summary, Experience, Projects, Skills, List, Education, Footer, SEO } from '../components';
import ColorPicker from '../elements/color-picker';

import '../main.css';

const html2canvas = typeof window !== `undefined` ? require('html2canvas') : null

const styles = {
  actionsBar: {
    alignItems: 'center',
  },
  actionButton: {
    marginRight: 15,
  },
};

const Home = () => {
  const dispatch = useDispatch();
  const { mode, resume, touched } = useSelector(({ global }) => global);
  const isEdit = mode === 'edit';

  const exportResume = async () => {
    const resumeEl = document.getElementById('resume');
    const width = typeof window !== `undefined` ? parseFloat(window.getComputedStyle(resumeEl).width) : 0;
    const height = typeof window !== `undefined` ? parseFloat(window.getComputedStyle(resumeEl).height) + 50 : 0;
    const canvas = await html2canvas(resumeEl, { y: 0, width, height });
    const imgData = canvas.toDataURL('image/png');
    var link = document.createElement('a');
    link.download = `${kebabCase(resume.fullname)}-resume.png`;
    link.href = imgData;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleMode = () => {
    dispatch({
      type: 'SET_FIELD', 
      payload: { path: 'mode', value: isEdit ? 'preview' : 'edit' },
    });
  };

  const onColorChange = color => {
    const customThemeStylesEl = document.getElementById('custom-theme-styles');
    customThemeStylesEl.innerHTML = `
      a,.text-primary-500, .text-secondary-500, .section-header, .contact-link, .contact-link:hover, .contact-icon {color: ${color} !important;}
      .section-header {border-color: ${color} !important;}
      .btn-secondary, .btn-secondary:hover {color: white !important; background: ${color} !important;}
      .bg-primary-500, .tag {background: ${color} !important;}
    `;
  };

  useEffect(function onFirstTouch() {
    if (isEdit && !touched) {
      dispatch({ type: 'SET_FIELD', payload: { path: 'touched', value: true } });
    }
  }, [isEdit, touched, dispatch]);
  
  return (
    <>
      <div className="flex container mx-auto bg-white py-5 pl-1" style={styles.actionsBar}>
        {!isEdit && (
          <Button color="teal" content="Edit" icon="edit" labelPosition="right" style={styles.actionButton} onClick={toggleMode} />
        )}
        {isEdit && (
          <Popup
            content="Click to enable Export"
            trigger={<Button color="teal" content="Preview" icon="eye" labelPosition="right" style={styles.actionButton} onClick={toggleMode} />}
          />
        )}
        <Button color="teal" content="Export" icon="download" labelPosition="right" style={styles.actionButton} onClick={exportResume} disabled={isEdit} />
        <div className="flex" style={styles.actionsBar}>
          <ColorPicker onChange={onColorChange} />
          <Label basic color="teal" pointing="left">
            Customize Theme Color
          </Label>
        </div>
      </div>

      <main className="antialiased text-neutral-900 bg-neutral-100 min-h-screen sm:p-5">
        <SEO title="Resume" />
        <div id="resume" className="container mx-auto shadow bg-white py-5 px-10">
          <Header name={resume.fullname} role={resume.role} contacts={resume.contact} />
          <Summary data={resume.summary} />
          <div className="border-b border-neutral-300 pb-2 my-5 lg:flex">
            <div className="lg:w-2/3 lg:pr-8">
              {resume.experience && <Experience />}
              {resume.projects && <Projects />}
            </div>
            <div className="lg:w-1/3 lg:pl-8 lg:border-l lg:border-neutral-300 ">
              {resume.skills && <Skills />}
              {resume.education && <Education />}
              {resume.sidebar && resume.sidebar.map(item => (
                <List key={`${item.title}-side`} data={item} />
              ))}
            </div>
          </div>
          <Footer social={resume.social} />
        </div>
      </main>
    </>
  );
};

export default Home;
