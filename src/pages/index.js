import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import kebabCase from 'lodash.kebabcase';
import React, { useEffect } from 'react';
import { TiDirections } from 'react-icons/ti';
import { useSelector, useDispatch } from 'react-redux';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import { Button, Label, Popup, Dropdown, Icon } from 'semantic-ui-react';

import ColorPicker from '../elements/color-picker';
import FiverrModal from '../components/affiliate/fiverr/modal';
import FiverrHeader from '../components/affiliate/fiverr/header';
import { Header, Summary, Experience, Projects, Skills, List, Education, Footer, SEO } from '../components';

import '../css/filepond.css';
import '../css/filepond-plugin-image-preview.css';
import '../css/phone-input.css';
import '../css/calendar.css';
import '../css/date-picker.css';
import '../main.css';

const jsPDF = typeof window !== `undefined` ? require('jspdf') : null
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

const exportPNG = (canvas, name) => {
  const imgData = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `${kebabCase(name)}-resume.png`;
  link.href = imgData;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  trackCustomEvent({
    category: 'Export PNG',
    action: 'Click',
    label: 'Export',
  });
};

const exportPDF = (canvas, name) => {
  const imgData = canvas.toDataURL('image/png', 1.0);
  const doc = (() => {
    if (canvas.width > canvas.height) {
      return new jsPDF('l', 'mm', [canvas.width, canvas.height]);
    }
    return new jsPDF('p', 'mm', [canvas.height, canvas.width]);
  })();

  const docWidth = doc.internal.pageSize.getWidth();
  const docHeight = doc.internal.pageSize.getHeight();

  doc.addImage(imgData, 'PNG', 0, 0, docWidth, docHeight);
  doc.save(`${kebabCase(name)}-resume.pdf`);

  trackCustomEvent({
    category: 'Export PDF',
    action: 'Click',
    label: 'Export',
  });
};

function exportDoc(htmlBody, name){
  const htmlHead = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
  const htmlEnd = '</body></html>';
  const html = htmlHead + htmlBody + htmlEnd;

  const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
  const url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);  
  const filename = `${kebabCase(name)}-resume.doc`;
  
  if (navigator.msSaveOrOpenBlob ){
      navigator.msSaveOrOpenBlob(blob, filename);
  } else {
      const downloadLink = document.createElement('a');
      document.body.appendChild(downloadLink);
      downloadLink.href = url;
      downloadLink.download = filename;
      downloadLink.click();
      document.body.removeChild(downloadLink);
  }

  trackCustomEvent({
    category: 'Export DOCS',
    action: 'Click',
    label: 'Export',
  });
}

const CreatePage = ({ data }) => {
  const dispatch = useDispatch();

  const { 
    mode, 
    resume, 
    touched, 
    isMobile,
    direction, 
    themeColor,
  } = useSelector(({ global }) => global);

  const ltr = direction === 'ltr';
  const isEdit = mode === 'edit';

  const exportResume = async docType => {
    const resumeEl = document.getElementById('resume');
    const y = resumeEl.offsetTop ? resumeEl.offsetTop : (isMobile ? 230 : 180);
    const width = typeof window !== `undefined` ? parseFloat(window.getComputedStyle(resumeEl).width) : 0;
    const height = typeof window !== `undefined` ? parseFloat(window.getComputedStyle(resumeEl).height) : 0;
    const canvas = await html2canvas(resumeEl, { y, width, height });
    if (docType === 'pdf') {
      exportPDF(canvas, resume.fullname);
    } else if (docType === 'png') {
      exportPNG(canvas, resume.fullname);
    } else if (docType === 'docx') {
      exportDoc(resumeEl.innerHTML, resume.fullname);
    }
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
      <FiverrModal appearInSeconds={50} />
      <FiverrHeader />
      <div 
        style={styles.actionsBar}
        className="flex container flex-wrap items-center mx-auto bg-white py-5 pl-1" 
      >
        <a 
          rel="noopener"
          target="_blank"
          className="my-4"
          title="Resumaker Logo" 
          style={styles.logoLink} 
          href="https://resumaker.me" 
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
            <Dropdown
              lazyLoad
              trigger={
                <Button 
                  color="violet" 
                  icon="download" 
                  content="Export" 
                  disabled={isEdit}
                  labelPosition="right" 
                  style={styles.actionButton}
                />
              }
            >
              {isEdit ? <React.Fragment /> : (
                <Dropdown.Menu>
                  <Dropdown.Header content="Choose Format" />
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => exportResume('pdf')}>
                    <Button 
                      size="small" 
                      color="violet" 
                      content="PDF" 
                      icon="file pdf" 
                      labelPosition="right"  
                    />
                  </Dropdown.Item>

                  <Dropdown.Item onClick={() => exportResume('png')}>
                    <Button 
                      size="small" 
                      color="violet" 
                      content="PNG" 
                      icon="file image" 
                      labelPosition="right" 
                    />
                  </Dropdown.Item>
                  <Dropdown.Item>

                  <Dropdown.Item>
                    <Dropdown
                      lazyLoad
                      floating
                      trigger={
                        <Button 
                          size="small" 
                          color="violet" 
                          content="DOCX" 
                          icon="file word" 
                          labelPosition="right" 
                        />
                      }
                    >
                      <Dropdown.Menu>
                        <Dropdown.Header content="Choose Quality" />
                        <Dropdown.Divider />
                        <Dropdown.Item>
                          <div 
                            style={styles.actionsBar}
                            className="flex items-center" 
                            onClick={() => exportResume('docx')}
                          >
                            <span>Low</span>
                            <Popup
                              size="large"
                              position="top right"
                              content="Basic docx using Resumaker's simple algorithm"
                              trigger={
                                <Icon circular size="small" name="question" onClick={e => {e.preventDefault();e.stopPropagation();}} />
                              }
                            />
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <div 
                            style={styles.actionsBar}
                            className="flex items-center" 
                            onClick={() => {
                              exportResume('pdf');
                              trackCustomEvent({
                                category: 'Affiliate - PDFSimpli',
                                action: 'Navigate',
                                label: 'PDFSimpli',
                              });
                              window.open('https://pdfsimpli.com/lp/pdf-to-word?fpr=guy31', '_blank');
                            }}
                          >
                            <span>High</span>
                            <Popup
                              size="large"
                              position="top right"
                              content="We generate pdf & redirect to a professional pdf-to-docx converter"
                              trigger={
                                <Icon circular size="small" name="question" onClick={e => {e.preventDefault();e.stopPropagation();}} />
                              }
                            />
                          </div>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Dropdown.Item>
                  </Dropdown.Item>
                </Dropdown.Menu>
              )}
            </Dropdown>
            <div className="flex items-center color-picker-container">
              <ColorPicker 
                initialColor={themeColor}
                onChange={color => 
                  dispatch({ 
                    type: 'SET_FIELD',
                    payload: { path: 'themeColor', value: color },
                  })
                } 
              />
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
