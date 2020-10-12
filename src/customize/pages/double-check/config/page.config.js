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
  outputDir: 'dist/double-check',
  serverPort: 8095,
  pages: [
    {
      name: 'attest',
      template: 'src/customize/pages/double-check/template/index.html',
      entry: 'src/modules/module-double-check/index.js',
      title: '二重认证',
    }
  ],
};
