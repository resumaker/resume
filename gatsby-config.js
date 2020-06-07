module.exports = {
  siteMetadata: {
    title: `Resumaker | Free online professional resume creation tool`,
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
        background_color: `#f7f0eb`,
        theme_color: `#38B2AC`,
        display: `standalone`,
        icon: 'src/assets/site-icon.png'
      },
    },
    'gatsby-plugin-offline',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true,
        tailwind: true, 
      },
    },
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
