import { Base64 } from 'js-base64';
import { useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import React, { useState, useEffect } from 'react';

const styles = {
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

const CopyButton = () => {
  const { resume, touched, isMobile } = useSelector(({ global }) => global);

  const [copied, setCopied] = useState(false);
  const [showDesktopCopy, setShowDesktopCopy] = useState(false);
  const [copyEnabled, setCopyEnabled] = useState(!/^data:image\/(png|gif|webp|jpe?g);base64,/.test(resume.profilePicture));

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

  return (
    <>
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
            <input 
              value="" 
              type="text" 
              id="copy-desktop-link" 
              style={{position: 'fixed', bottom: -2000, left: -1000}}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CopyButton;
