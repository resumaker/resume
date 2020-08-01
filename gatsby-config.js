const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  siteMetadata: {
    title: `Free Online Professional Resume Creation Tool`,
    author: `resumaker.me`,
    description: `Resumaker eases the process of building professional, beautiful & costumisable resumes and cv documents. Edit, Customise, Preview, and Export your resume within minutes.`,
    siteUrl: `https://app.resumaker.me/`,
    social: {
      twitter: `Resumaker2`,
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
      resolve: 'gatsby-plugin-load-script',
      options: {
        src: 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js',
        'data-name': 'BMC-Widget',
        'data-id': 'superlaunchapp',
        'data-description': 'Support me on Buy me a coffee!',
        'data-message': 'Thanks for visiting! You can support my work by buying me a coffee 💜',
        'data-color': '#5b4f96',
        'data-position': 'right',
        'data-x_margin': '18',
        'data-y_margin': '18',
        disable: typeof window !== `undefined` ? window.innerWidth < 767 : false,
        async: true,
        defer: true,
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