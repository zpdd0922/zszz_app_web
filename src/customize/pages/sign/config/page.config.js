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
  outputDir: 'dist/sign',
  serverPort: 28001,
  pages: [
    {
      name: 'index',
      template: 'src/customize/pages/sign/template/index.html',
      entry: 'src/modules/module-sign/index.js',
      title: '登录',
    }
  ],
};
