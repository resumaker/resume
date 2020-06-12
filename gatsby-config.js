const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  siteMetadata: {
    title: `Free Online Professional Resume Creation Tool`,
    author: `resumaker.me`,
    description: `Resumaker eases the process of building professional, beautiful & costumisable resumes and cv documents. Edit, Customise, Preview, and Export your resume within minutes.`,
    siteUrl: `https://resumaker.me/`,
    social: {
      twitter: `guypeer1`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Guy Peer`,
        short_name: `Resumaker`,
        start_url: `/`,
        background_color: `#5b4f96`,
        theme_color: `#5b4f96`,
        display: `mini-ui`,
        icon: 'src/images/resumaker-favicon.png'
      },
    },
    'gatsby-plugin-offline',
    'gatsby-transformer-json',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
          pathToCreateStoreModule: './src/store/index',
          serialize: {
              space: 0,
              isJSON: true,
              unsafe: false,
          },
          cleanupOnClient: true,
          windowKey: '__PRELOADED_STATE__',
      },
    },
  ],
};

if (!isDev) {
  module.exports.plugins.push({
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: 'UA-169227649-1',
    },
  });
}