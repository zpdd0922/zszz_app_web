// webpack相关配置
module.exports = {
  baseUrl: './',
  outputDir: 'dist/all',
  serverPort: 8008,
  pages: [
    {
      name: 'index',
      template: 'customize/pages/all/template/index.html',
      entry: 'customize/entries/all/index.js',
      title: '智珠宝',
    }
  ],
};
