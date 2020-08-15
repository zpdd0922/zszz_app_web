/*
 * @Author: Jim
 * @Date: 2019-12-16 17:30:02
 * @LastEditors: Jim
 * @LastEditTime: 2019-12-16 17:37:42
 * @Description: 
 */
// webpack相关配置
module.exports = {
  baseUrl: './',
  outputDir: 'dist/download',
  serverPort: 28003,
  pages: [
    {
      name: 'index',
      template: 'src/customize/pages/download/template/index.html',
      entry: 'src/modules/module-download/index.js',
      title: '下载地址',
    }
  ],
};