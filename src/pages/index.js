import sample from 'lodash/sample';
import { Icon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

import Logo from '../components/general/logo';
import Sidebar from '../components/general/sidebar';
import ActionButtons from '../components/general/action-buttons';
import CopyButton from '../components/general/action-buttons/copy';

import FiverrModal from '../components/affiliate/fiverr/modal';
import FiverrHeader from '../components/affiliate/fiverr/header';

import AppjobsModal from '../components/affiliate/appjobs/modal';
import AppjobsHeader from '../components/affiliate/appjobs/header';

import WixModal from '../components/affiliate/wix/modal';

import { Header, Summary, Experience, Projects, Skills, List, Education, Footer, SEO } from '../components/resume';

import { useDispatch } from '../hooks/use-dispatch';

import '../css/filepond.css';
import '../css/filepond-plugin-image-preview.css';
import '../css/phone-input.css';
import '../css/calendar.css';
import '../css/date-picker.css';
import '../main.css';

const styles = {
  actionsBar: {
    justifyContent: 'space-between',
  },  
  sidebarArrow: {
    zIndex: 103,
    cursor: 'pointer',
    position: 'fixed',
  },
  directionButton: {
    marginRight: 15,
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
};

const AFFILIATE_HEADERS = ['fiverr', 'appjobs'];

const ResumePage = () => {
  const dispatch = useDispatch();
  const [header, setHeader] = useState('fiverr');

  const { 
    mode, 
    resume, 
    touched, 
    direction, 
    themeColor, 
    isMobile, 
    sidebarActive,
  } = useSelector(({ global }) => global);

  const ltr = direction === 'ltr';
  const isEdit = mode === 'edit';

  useEffect(function onFirstTouch() {
    if (isEdit && !touched) {
      dispatch('touched', true);
    }
  }, [isEdit, touched, dispatch]);

  useEffect(function onResizeScreen() {
    const onResize = () => {
      dispatch('isMobile', window.innerWidth < 767);
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

  useEffect(function onDirectionChange() {
    const customThemeStylesEl = document.getElementById('custom-direction-styles');
    if (ltr) {
      customThemeStylesEl.innerHTML = `main {direction: ${direction};}`;
    } else {
      customThemeStylesEl.innerHTML = `
        main {direction: ${direction};}
        .section-header {border-left-width: 0 !important; border-right-width: 4px; padding-left: 0; padding-right: 10px;}
      `;
    }
    trackCustomEvent({
      category: 'Direction',
      action: 'Change',
      label: direction.toUpperCase(),
    });
  }, [direction]);

  useEffect(function switchAffiliateHeader() {
    const interval = window.setInterval(() => {
      if (interval) { setHeader(sample(AFFILIATE_HEADERS)); }
    }, 60000);
    return () => {
        if (interval) { window.clearInterval(interval); }
    };
  }, []);  
  
  return (
    <>
      <Icon 
        circular
        bordered
        inverted
        color="violet"
        size={isMobile ? '36' : 'large'}
        name={`arrow ${sidebarActive ? 'left' : 'right'}`}
        style={{
          ...styles.sidebarArrow,
          top: isMobile? 75 : 2,
          left: isMobile ? 1 : 3,
        }}
        onClick={() => dispatch('sidebarActive', !sidebarActive)}
      />

      <FiverrModal appearInSeconds={60} />
      {header === 'fiverr' && <FiverrHeader />}

      <AppjobsModal appearInSeconds={150} />
      {header === 'appjobs' && <AppjobsHeader />}

      <WixModal appearInSeconds={320} />

      <CopyButton />

      <Sidebar />

      <div 
        style={styles.actionsBar}
        className="flex container flex-wrap items-center mx-auto bg-white py-5 pl-1" 
      >
        <Logo />
        
        <div className="flex flex-wrap">
          <ActionButtons />
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
      {/* <h3 id="788199">
        <a href="https://imp.i115008.net/c/2380348/788199/11298">
          Learn the latest tech skills and advance your career with Udacity. Enroll now to receive $50 off your Nanodegree Program!
        </a>
      </h3> */}

      <a href="https://imp.i115008.net/c/2380348/788180/11298" id="788180">
        <img src="//a.impactradius-go.com/display-ad/11298-788180" border="0" alt="" width="728" height="90" style={{margin:'auto'}} />
      </a>
      {/* <a href="https://imp.i115008.net/c/2380348/788196/11298" id="788196"><img src="//a.impactradius-go.com/display-ad/11298-788196" border="0" alt="" width="2912" height="360"/></a> */}
    </>
  );
};

export default ResumePage;
