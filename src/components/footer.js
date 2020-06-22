import React from 'react';
import { useSelector } from 'react-redux';
// import SocialIcon from './social_icon';

const Footer = ({ social }) => {
  const { direction } = useSelector(({ global }) => global);

  return (
    <footer className="py-6 mx-auto items-center justify-between md:flex bg-white">
      <div className="items-center flex tracking-wide mb-5 md:mb-0 justify-center text-sm ml-2 bg-white">
        {direction === 'ltr' && (
          <span className="inline-block mr-1 ml-1 bg-white">
            © {new Date().getFullYear()} | proudly powered by
          </span>
        )}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://resumaker.me"
          className="text-primary-500 hover:text-primary-700 font-bold bg-white"
        >
          https://resumaker.me
        </a>
      </div>
      {/* {social && (
        <div className="flex items-center justify-center ml-2">
          {social.map(item => (
            <a
              key={item.service}
              className="footer-social-link"
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              title={item.service}
            >
              <SocialIcon type={item.service} />
            </a>
          ))}
        </div>
      )} */}
    </footer>
  );
};

export default Footer;
