module.exports = {
  publicPath: './', // 基本路径,打包时加上.
  outputDir: 'website',
  productionSourceMap: false,
  lintOnSave: false,
  configureWebpack: {
    externals: {
      'element-ui': 'ELEMENT',
      'vue': 'Vue',
      "vue-router": "VueRouter",
      'vuex': "Vuex",
      "axios": 'axios',
      "vant": 'vant',
    }
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      cdn: {
        css: [
          'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/theme-chalk/index.css',
          // "https://cdn.jsdelivr.net/npm/vant@2.9/lib/index.css",
        ],
        js: [
          "https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js",
          "https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.min.js",
          "https://cdn.bootcdn.net/ajax/libs/vuex/3.2.0/vuex.min.js",
          "https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/index.js",
          "https://cdn.bootcdn.net/ajax/libs/axios/0.18.0/axios.min.js",
          // "https://cdn.jsdelivr.net/npm/vant@2.9/lib/vant.min.js",
        ]
      },
    }
  },
  devServer: {
    port: 8090
  }
};
