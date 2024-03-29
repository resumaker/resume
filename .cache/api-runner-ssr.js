var plugins = [{
      plugin: require('/Users/guypeer/Desktop/projects/a-projects/resumaker/resumaker-editor/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"Guy Peer","short_name":"Resumaker","start_url":"/","background_color":"#5b4f96","theme_color":"#5b4f96","display":"mini-ui","icon":"src/images/resumaker-favicon.png","cache_busting_mode":"query","include_favicon":true,"legacy":true,"theme_color_in_head":true,"cacheDigest":"5526978ba5ec1d2f9f6bbdf1b540490b"},
    },{
      plugin: require('/Users/guypeer/Desktop/projects/a-projects/resumaker/resumaker-editor/node_modules/gatsby-plugin-offline/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/guypeer/Desktop/projects/a-projects/resumaker/resumaker-editor/node_modules/gatsby-plugin-load-script/gatsby-ssr'),
      options: {"plugins":[],"src":"https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js","data-name":"BMC-Widget","data-id":"superlaunchapp","data-description":"Support me on Buy me a coffee!","data-message":"Thanks for visiting! You can support my work by buying me a coffee 💜","data-color":"#5b4f96","data-position":"right","data-x_margin":"18","data-y_margin":"18","disable":false,"async":true,"defer":true},
    },{
      plugin: require('/Users/guypeer/Desktop/projects/a-projects/resumaker/resumaker-editor/node_modules/gatsby-plugin-google-analytics/gatsby-ssr'),
      options: {"plugins":[],"trackingId":"UA-169227649-1"},
    },{
      plugin: require('/Users/guypeer/Desktop/projects/a-projects/resumaker/resumaker-editor/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
