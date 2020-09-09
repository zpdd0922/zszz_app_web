/**
 * @fileOverview app配置
 * @author FighterZhou
 * @date 2018/11/13
 */

/** eslint-disable no-new */
const path = require('path')

const logger = require('./build/lib/log')

logger.green('===== build.vue.config =====')

const BuildTools = require('./build/build.tools')
const buildTools = new BuildTools();

const vueConfig = buildTools.pagesConfig;
const themes = vueConfig.themes || {};
const pages = buildTools.createPages();

const customGlobalDefine = require(`./src/customize/define/index.js`);
process.env.VUE_APP_CUSTOMIZE_GLOBAL_DEFINE = JSON.stringify(customGlobalDefine);

module.exports = {
  publicPath: vueConfig.baseUrl || './', // 根域上下文目录
  outputDir: vueConfig.outputDir, // 构建输出目录
  assetsDir: './', // 静态资源目录 (js, css, img, fonts)
  pages: {
    ...themes,
    ...pages
  },
  chainWebpack: config => { // webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    
    if (process.env.NODE_ENV !== 'production') {
      // 本地开发配置
    } else {
      // 生产开发配置
      Object.keys(themes).forEach((theme) => {
        config.plugins.delete(`html-${theme}`);
      })
    }

    config
      .plugin('copy')
      .tap((args) => [
        [
          ...args[0],
          {
            from: './app-static',
            to: './',
            toType: 'dir',
            context: buildTools.customizePath
          },  
          {
            from: './app-static',
            to: './',
            toType: 'dir',
            context: buildTools.pagePath
          },
        ]
      ]);
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: []
      },
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: false,
      theme: false
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: vueConfig.serverPort, // 端口
    proxy: {
      '/dev-open': {
        // target: 'http://106.52.75.112:6012',
        // target: 'http://192.168.1.251:6012',
        // target: 'http://localhost:6012',
        // target: 'http://106.52.75.112:6003',
        // target: 'http://121.35.249.14:9011',
        target: 'http://106.52.75.112:6012',
        changeOrigin: true,
        pathRewrite: {
          '^/dev-open': ''
        }
      }
    }
    // proxy: {
    //   '/mktinfos': { //将www.exaple.com印射为/apis
    //     target: 'http://localhost:9001/', // 接口域名
    //     secure: false, // 如果是https接口，需要配置这个参数
    //     changeOrigin: true, //是否跨域
    //     pathRewrite: {
    //       '^/mktinfos': '' //需要rewrite的,
    //     }
    //   }
    // }
  }
}