// webpack相关配置
module.exports = {
  baseUrl: './',
  outputDir: 'dist/error',
  serverPort: 404,
  globalConfig: './global.js', // 打包对应相关变量,相对于/build/app-config目录
  themes: {
    'theme-default': {
      entry: './src/model-error/css/theme-default.scss'
    },
    'theme-white': {
      entry: './src/model-error/css/theme-white.scss'
    },
  },
  pages: [{
    name: '404',
    template: 'src/customize/pages/error/template/index.html',
    entry: 'src/modules/module-error/index.js',
    title: '404页面',
  }],
};
