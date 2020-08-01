import React from 'react';
import Img from 'gatsby-image';
import { graphql, useStaticQuery } from 'gatsby';

const styles = {
  logoLink: {
    maxHeight: 49,
  },
};

const Logo = () => {
  const { logo } = useStaticQuery(graphql`
    {
      logo: file(relativePath: { eq: "resumaker-logo-dark.png" }) {
        childImageSharp {
          fixed(width: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return (
    <a 
        target="_blank"
        className="my-4"
        title="Resumaker Logo" 
        style={styles.logoLink} 
        rel="noopener noreferrer"
        href="https://resumaker.me" 
    >
        <Img 
            fixed={logo.childImageSharp.fixed} 
            title="Resumaker Logo"
            alt="Resumaker Logo"
        />
    </a>
  );
};

export default Logo;
