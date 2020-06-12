module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"Guy Peer","short_name":"Resumaker","start_url":"/","background_color":"#5b4f96","theme_color":"#5b4f96","display":"mini-ui","icon":"src/images/resumaker-favicon.png","cache_busting_mode":"query","include_favicon":true,"legacy":true,"theme_color_in_head":true,"cacheDigest":"5526978ba5ec1d2f9f6bbdf1b540490b"},
    },{
      plugin: require('../node_modules/gatsby-plugin-offline/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-react-redux/gatsby-browser.js'),
      options: {"plugins":[],"pathToCreateStoreModule":"./src/store/index","serialize":{"space":0,"isJSON":true,"unsafe":false},"cleanupOnClient":true,"windowKey":"__PRELOADED_STATE__"},
    },{
      plugin: require('../node_modules/gatsby-plugin-google-analytics/gatsby-browser.js'),
      options: {"plugins":[],"trackingId":"UA-169227649-1"},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
