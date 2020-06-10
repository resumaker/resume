module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"Guy Peer","short_name":"Resumaker","start_url":"/","background_color":"#5b4f96","theme_color":"#5b4f96","display":"mini-ui","icon":"src/assets/resumaker-favicon.png","cache_busting_mode":"query","include_favicon":true,"legacy":true,"theme_color_in_head":true,"cacheDigest":"4fdc72d0f6b35a446d48e64fb90af057"},
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
