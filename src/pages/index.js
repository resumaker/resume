import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import kebabCase from 'lodash.kebabcase';
import { TiDirections } from 'react-icons/ti';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Label, Popup } from 'semantic-ui-react';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

import { Header, Summary, Experience, Projects, Skills, List, Education, Footer, SEO } from '../components';
import ColorPicker from '../elements/color-picker';

import '../css/filepond.css';
import '../css/filepond-plugin-image-preview.css';
import '../css/phone-input.css';
import '../css/calendar.css';
import '../css/date-picker.css';
import '../main.css';

const html2canvas = typeof window !== `undefined` ? require('html2canvas') : null

const styles = {
  logoLink: {
    maxHeight: 49,
  },
  actionsBar: {
    justifyContent: 'space-between',
  },  
  actionButton: {
    marginRight: 15,
  },
  headerRightContainer: {
    flexDirection: 'column',
  },
  directionButton: {
    marginTop: -15,
    display: 'flex',
    marginBottom: 15,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
};

const CreatePage = ({ data }) => {
  const dispatch = useDispatch();
  const { mode, resume, touched, direction, isMobile } = useSelector(({ global }) => global);
  const ltr = direction === 'ltr';
  const isEdit = mode === 'edit';

  const [themeColor, setThemeColor] = useState('#5b4f96');

  const exportResume = async () => {
    const resumeEl = document.getElementById('resume');
    const width = typeof window !== `undefined` ? parseFloat(window.getComputedStyle(resumeEl).width) : 0;
    const height = typeof window !== `undefined` ? parseFloat(window.getComputedStyle(resumeEl).height) : 0;
    const canvas = await html2canvas(resumeEl, { y: 135, width, height });
    const imgData = canvas.toDataURL('image/png');
    var link = document.createElement('a');
    link.download = `${kebabCase(resume.fullname)}-resume.png`;
    link.href = imgData;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    trackCustomEvent({
      category: 'Export Button',
      action: 'Click',
      label: 'Export',
    });
  };

  const toggleMode = () => {
    trackCustomEvent({
      category: 'Edit / Preview Button',
      action: 'Click',
      label: isEdit ? 'Edit -> Preview' : 'Preview -> Edit',
    });
    dispatch({
      type: 'SET_FIELD', 
      payload: { path: 'mode', value: isEdit ? 'preview' : 'edit' },
    });
  };

  useEffect(function onFirstTouch() {
    if (isEdit && !touched) {
      dispatch({ type: 'SET_FIELD', payload: { path: 'touched', value: true } });
    }
  }, [isEdit, touched, dispatch]);

  useEffect(function onResizeScreen() {
    const onResize = () => {
      dispatch({ 
        type: 'SET_FIELD', 
        payload: { path: 'isMobile', value: window.innerWidth < 767 },
      });
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(function onColorChange() {
    const customThemeStylesEl = document.getElementById('custom-theme-styles');
    customThemeStylesEl.innerHTML = `
      a,.text-primary-500, .text-secondary-500, .section-header, .contact-link, .contact-link:hover, .contact-icon {color: ${themeColor} !important;}
      .section-header {border-color: ${themeColor} !important;}
      .btn-secondary, .btn-secondary:hover {color: white !important; background: ${themeColor} !important;}
      .bg-primary-500, .tag {background: ${themeColor} !important;}
    `;
    trackCustomEvent({
      category: 'Color Widget',
      action: 'Change',
      label: 'Change Color',
    });
  }, [themeColor]);

  useEffect(function onColorChange() {
    const customThemeStylesEl = document.getElementById('custom-direction-styles');
    if (ltr) {
      customThemeStylesEl.innerHTML = `* {direction: ${direction};}`;
    } else {
      customThemeStylesEl.innerHTML = `
        * {direction: ${direction};}
        .section-header {border-left-width: 0 !important; border-right-width: 4px; padding-left: 0; padding-right: 10px;}
      `;
    }
    trackCustomEvent({
      category: 'Direction',
      action: 'Change',
      label: direction.toUpperCase(),
    });
  }, [direction]);
  
  return (
    <>
      <div className="flex container flex-wrap items-center mx-auto bg-white py-5 pl-1" style={styles.actionsBar}>
        <a 
          href="/" 
          className="my-4"
          title="Resumaker Logo" 
          style={styles.logoLink} 
          onClick={e => e.preventDefault()}
        >
          <Img fixed={data.logo.childImageSharp.fixed} alt="Resumaker Logo" />
        </a>

        <div className="flex flex-wrap" style={styles.headerRightContainer}>
          <Label 
            image
            circular
            as="a" 
            color="violet"
            style={{ 
              ...styles.directionButton, 
              marginTop: isMobile ? 0 : -15,
              alignSelf: `flex-${isMobile ? 'start' : 'end'}`,
            }}
            onClick={() => 
              dispatch({ 
                type: 'SET_FIELD', 
                payload: { 
                  path: 'direction',
                  value: direction === 'rtl' ? 'ltr' : 'rtl',
                }, 
              })
            }
          >
            <TiDirections size={18} className="ml-1 mr-2" />
            Change Text Direction
            <Label.Detail style={{paddingRight: 15}}>
              {direction.toUpperCase()}
            </Label.Detail>
          </Label>

          <div className="flex flex-wrap">
            {!isEdit && (
              <Button 
                icon="edit" 
                color="violet" 
                content="Edit" 
                onClick={toggleMode}
                labelPosition="right" 
                style={styles.actionButton} 
              />
            )}
            {isEdit && (
              <Popup
                content="Click to enable Export"
                trigger={
                  <Button 
                    icon="eye" 
                    color="violet" 
                    content="Preview" 
                    onClick={toggleMode} 
                    labelPosition="right" 
                    style={styles.actionButton} 
                  />
                }
              />
            )}
            <Button 
              color="violet" 
              icon="download" 
              content="Export" 
              disabled={isEdit}
              labelPosition="right" 
              onClick={exportResume} 
              style={styles.actionButton}
            />
            <div className="flex items-center color-picker-container">
              <ColorPicker onChange={setThemeColor} />
              <Label basic color="violet" pointing="left">
                Customize Theme Color
              </Label>
            </div>
          </div>
        </div>
      </div>

      <main className="antialiased text-neutral-900 bg-neutral-100 min-h-screen sm:p-5">
        <SEO title="Resumaker" />
        <div id="resume" className="container mx-auto shadow bg-white py-5 px-10">
          <Header 
            name={resume.fullname} 
            role={resume.role} 
            contacts={resume.contact}
          />
          <Summary data={resume.summary} />
          <div className="border-b border-neutral-300 pb-2 my-5 lg:flex">
            <div className={`lg:w-2/3 lg:p${ltr ? 'r' : 'l'}-8`}>
              {resume.experience && <Experience />}
              {resume.projects && <Projects />}
            </div>
            <div className={`lg:w-1/3 lg:p${ltr ? 'l' : 'r'}-8 lg:border-${ltr ? 'l' : 'r'} lg:border-neutral-300`}>
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

export const query = graphql`
  {
    logo: file(relativePath: { eq: "resumaker-logo-dark.png" }) {
      childImageSharp {
        fixed(width: 200) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;

export default CreatePage;
