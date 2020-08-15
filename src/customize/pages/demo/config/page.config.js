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
  outputDir: 'dist/demo',
  serverPort: 8080,
  pages: [
    {
      name: 'index',
      template: 'src/customize/pages/demo/template/index.html',
      entry: 'src/modules/module-demo/index.js',
      title: 'Demo',
    }
  ],
};
