module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"Guy Peer","short_name":"Resumaker","start_url":"/","background_color":"#f7f0eb","theme_color":"#38B2AC","display":"standalone","icon":"src/assets/site-icon.png","cache_busting_mode":"query","include_favicon":true,"legacy":true,"theme_color_in_head":true,"cacheDigest":"66160dc3c87f08bf9abae677e03bc9dd"},
    },{
      plugin: require('../node_modules/gatsby-plugin-offline/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-react-redux/gatsby-browser.js'),
      options: {"plugins":[],"pathToCreateStoreModule":"./src/store/index","serialize":{"space":0,"isJSON":true,"unsafe":false},"cleanupOnClient":true,"windowKey":"__PRELOADED_STATE__"},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
