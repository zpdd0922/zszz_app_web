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
  outputDir: 'dist/sunline/agreement',
  serverPort: 28004,
  pages: [
    {
      name: 'index',
      template: 'src/customize/pages/document/template/index.html',
      entry: 'src/modules/module-document/index.js',
      title: '平台文档',
    },
    {
      name: 'list',
      template: 'src/customize/pages/document/template/index.html',
      entry: 'src/modules/module-document/list.js',
      title: '平台文档列表',
    }
  ],
};