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
  outputDir: 'dist/sunline/open-account',
  serverPort: 8905,
  pages: [
    {
      name: 'index',
      template: 'src/customize/pages/iopen/template/index.html',
      entry: 'src/modules/module-iopen/index.js',
      title: '开户',
    }
  ],
};
