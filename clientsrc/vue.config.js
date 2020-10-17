module.exports = {
  outputDir: "../client",
  productionSourceMap: false,
  chainWebpack: config =>{ 
    config.module.rule("vue").use("vue-loader").tap(options => {
      return {
        transformAssetUrls: {
          "v-img": "src"
        }
      }
    })
  }
};
