import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from '@reach/router';
import { Icon, Button, Flag } from 'semantic-ui-react';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

import Logo from '../components/general/logo';
import Sidebar from '../components/general/sidebar';
import JobsSidebar from '../components/general/jobs-sidebar';
import ActionButtons from '../components/general/action-buttons';
import CopyButton from '../components/general/action-buttons/copy';

import WixModal from '../components/affiliate/wix/modal';
import FiverrModal from '../components/affiliate/fiverr/modal';
import FiverrHeader from '../components/affiliate/fiverr/header';
import UdacityBanner from '../components/affiliate/udacity/banner';

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
  jobsButton: {
    marginBottom: 10,
    marginLeft: 5,
    width: 145,
  },
};

const ResumePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { 
    mode, 
    resume, 
    touched, 
    direction, 
    themeColor, 
    isMobile, 
    sidebarActive,
    jobsSidebarActive,
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

  useEffect(function openJobPortal() {
    const qp = queryString.parse(location.search);
    if (qp['jobs']) {
      window.history.replaceState(null, null, location.origin);
      dispatch('jobsSidebarActive', true);
    }
  }, []);  
  
  useEffect(function onOpenJobPortal() {
    const label = jobsSidebarActive ? 'Open Jobs' : 'Close Jobs';
    trackCustomEvent({
      category: label,
      action: label,
      label: label,
    });
  }, [jobsSidebarActive]);

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

  return (
    <>
      <Icon 
        circular
        bordered
        inverted
        color="violet"
        size={isMobile ? '36' : 'large'}
        name={`arrow ${sidebarActive ? 'left' : 'right'}`}
        onClick={() => dispatch('sidebarActive', !sidebarActive)}
        style={{
          ...styles.sidebarArrow,
          zIndex: jobsSidebarActive ? -1 : 103,
          top: isMobile? 75 : 2,
          left: isMobile ? 1 : 3,
        }}
      />

      <FiverrHeader />
      <FiverrModal appearInSeconds={60} />
      <WixModal appearInSeconds={280} />

      <CopyButton />

      <Sidebar />
      <JobsSidebar />

      <div 
        style={styles.actionsBar}
        className="flex container flex-wrap items-center mx-auto bg-white py-5 pl-1" 
      >
        <div className="flex" style={{flexDirection:'column'}}>
          <Logo />
          <Button 
            style={styles.jobsButton}
            color={isMobile ? 'black' : 'violet'}
            onClick={() => dispatch('jobsSidebarActive', true)}
          >
            <Flag name='il' />
            Jobs in Israel 
          </Button>   
        </div>
        
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

      <UdacityBanner />
    </>
  );
};

export default ResumePage;
