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
  outputDir: 'dist/iopen-extension',
  serverPort: 8905,
  pages: [
    {
      name: 'index',
      template: 'src/customize/pages/iopen-extension/template/index.html',
      entry: 'src/modules/module-iopen-extension/index.js',
      title: '增开孖展账户',
    }
  ],
};
