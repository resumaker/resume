import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

const SEO = ({ description, lang, meta, title }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );
  const metaDescription = description || site.siteMetadata.description;
  return (
    <Helmet
      title={title}
      htmlAttributes={{lang}}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
      ].concat(meta)}
    >
      <script data-ad-client="ca-pub-8377217125784648" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
      <meta name="google-site-verification" content="frBjtmq8mQ4ngQJX7rrEg2Tg8QkIo7T_dMw3nVHs0Q8" />
      <meta name="description" content={metaDescription} />
      <meta name="author" content="Resumaker.me" />

      <meta property="og:title" content="Resumaker | Free Online Professional Resume Creation Tool" />
      <meta property="og:image" content="src/images/resumaker-logo-dark.png" />
      <meta property="og:url" content="https://app.resumaker.me/" />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />

      <meta property="twitter:title" content="Resumaker | Free Online Professional Resume Creation Tool" />
      <meta property="twitter:image" content="src/images/resumaker-logo-dark.png" />
      <meta property="twitter:card" content="https://app.resumaker.me/" />
      <meta property="twitter:description" content={metaDescription} />
    </Helmet>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default SEO;
