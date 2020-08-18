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
  outputDir: 'dist/helpcenter',
  serverPort: 28003,
  pages: [
    {
      name: 'index',
      template: 'src/customize/pages/help-center/template/index.html',
      entry: 'src/modules/module-help-center/index.js',
      title: '帮助中心',
    }
  ],
};