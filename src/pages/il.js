import Img from 'gatsby-image';
import { graphql } from 'gatsby';
// import random from 'lodash.random';
import { Base64 } from 'js-base64';
import { TiDirections } from 'react-icons/ti';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';
import { Button, Label, Popup, Dropdown, Icon } from 'semantic-ui-react';

import exportResume from '../utils/export';
import ColorPicker from '../elements/color-picker';
// import WixModal from '../components/affiliate/wix/modal';
// import WixHeader from '../components/affiliate/wix/header';
import FiverrModal from '../components/affiliate/fiverr/modal';
import FiverrHeader from '../components/affiliate/fiverr/header';
import { Header, Summary, Experience, Projects, Skills, List, Education, Footer, SEO } from '../components';

import '../css/filepond.css';
import '../css/filepond-plugin-image-preview.css';
import '../css/phone-input.css';
import '../css/calendar.css';
import '../css/date-picker.css';
import '../main.css';

// const randomNumber = random(1);

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
    marginRight: 15,
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  fixedMobileDesktopLink: {
    left: 0,
    right: 0,
    zIndex: 1,
    position: 'fixed',
    transition: 'bottom 1s',
    padding: '20px 10px 10px',
    boxShadow: `0 0 4px #5b4f96`,
    justifyContent: 'space-between',
  },
  close: {
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

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

  const [copied, setCopied] = useState(false);
  const [showDesktopCopy, setShowDesktopCopy] = useState(false);
  const [copyEnabled, setCopyEnabled] = useState(!/^data:image\/(png|gif|webp|jpe?g);base64,/.test(resume.profilePicture));

  const ltr = direction === 'ltr';
  const isEdit = mode === 'edit';

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

  useEffect(function onProfilePictureChanged() {
    setCopyEnabled(!/^data:image\/(png|gif|webp|jpe?g);base64,/.test(resume.profilePicture));
  }, [resume.profilePicture]);

  useEffect(function onMobile() {
    if (isMobile && touched) {
      let t = window.setTimeout(() => {
        setShowDesktopCopy(true);
      }, 10000);
      return () => {
        if (t) {
          window.clearTimeout(t);
        }
      };
    }
  }, [isMobile, touched]);

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
      {/* {randomNumber === 1 && (
        <>
          <WixModal appearInSeconds={50} />
          <WixHeader />
        </>
      )} */}
      {isMobile && copyEnabled && (
        <div 
          className="bg-white" 
          style={{
            ...styles.fixedMobileDesktopLink,
            bottom: showDesktopCopy ? 0 : -300,
          }}
        >
          <p className="mb-4">
            Desktop editing experience is better.
            Click <strong>Copy</strong> & paste the link to your pc
            to gain a better experience while saving 
            the data you have already edited.
          </p>
          <div>
            <Button 
              size="tiny"
              color="violet" 
              disabled={copied}
              labelPosition="right" 
              icon={copied ? 'checkmark' : 'copy'}
              content={copied ? 'Copied' : 'Copy'}
              onClick={() => {
                var copyText = document.getElementById('copy-desktop-link');
                copyText.value = `${window.location.origin}?d=${encodeURIComponent(Base64.encode(window.localStorage.getItem('resumakerSettings')))}`;
                copyText.focus();
                copyText.select();
                document.execCommand('copy');
                setCopied(true);
                window.setTimeout(() => setCopied(false), 2000);
              }}
            />
            <span 
              className="ml-4" 
              style={styles.close}
              onClick={() => setShowDesktopCopy(false)}
            >
              Close
            </span>
            <input type="text" value="" id="copy-desktop-link" style={{position: 'fixed', bottom: -2000, left: -1000}} />
          </div>
        </div>
      )}

      <div 
        style={styles.actionsBar}
        className="flex container flex-wrap items-center mx-auto bg-white py-5 pl-1" 
      >
        <a 
          target="_blank"
          className="my-4"
          title="Resumaker Logo" 
          style={styles.logoLink} 
          rel="noopener noreferrer"
          href="https://resumaker.me" 
        >
          <Img fixed={data.logo.childImageSharp.fixed} alt="Resumaker Logo" />
        </a>

        <div className="flex flex-wrap" style={styles.headerRightContainer}>
          <div className={`flex items-center mb-4 justify-${isMobile ? 'start' : 'end'}`}>
            <Label 
              image
              as="a" 
              circular
              color="violet"
              style={styles.directionButton}
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
              Change Direction
              <Label.Detail style={{paddingRight: 15}}>
                {direction.toUpperCase()}
              </Label.Detail>
            </Label>
            <Popup
                content="Clear the whole document. Anything you have edited will be lost."
                trigger={
                  <Button 
                    circular
                    size="tiny"
                    icon="refresh" 
                    color="violet" 
                    content="Clear" 
                    onClick={() => {
                      window.localStorage.clear();
                      window.location.reload();
                    }}
                    labelPosition="right" 
                  />
                }
              />
          </div>

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
                  <Dropdown.Item onClick={() => exportResume('pdf', resume.fullname, isMobile)}>
                    <Button 
                      size="small" 
                      color="violet" 
                      content="PDF" 
                      icon="file pdf" 
                      labelPosition="right"  
                    />
                  </Dropdown.Item>

                  <Dropdown.Item onClick={() => exportResume('png', resume.fullname, isMobile)}>
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
                            onClick={() => exportResume('docx', resume.fullname, isMobile)}
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
                              exportResume('pdf', resume.fullname, isMobile);
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
              <Experience />
              <Projects />
            </div>
            <div className={`lg:w-1/3 lg:p${ltr ? 'l' : 'r'}-8 lg:border-${ltr ? 'l' : 'r'} lg:border-neutral-300`}>
              <Skills />
              <Education />
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
