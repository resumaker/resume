var plugins = [{
      plugin: require('/Users/guypeer/Desktop/projects/resume/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"Guy Peer","short_name":"Resumaker","start_url":"/","background_color":"#f7f0eb","theme_color":"#38B2AC","display":"standalone","icon":"src/assets/site-icon.png","cache_busting_mode":"query","include_favicon":true,"legacy":true,"theme_color_in_head":true,"cacheDigest":"66160dc3c87f08bf9abae677e03bc9dd"},
    },{
      plugin: require('/Users/guypeer/Desktop/projects/resume/node_modules/gatsby-plugin-offline/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/guypeer/Desktop/projects/resume/node_modules/gatsby-plugin-react-redux/gatsby-ssr'),
      options: {"plugins":[],"pathToCreateStoreModule":"./src/store/index","serialize":{"space":0,"isJSON":true,"unsafe":false},"cleanupOnClient":true,"windowKey":"__PRELOADED_STATE__"},
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
