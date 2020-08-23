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
  outputDir: 'dist/information',
  serverPort: 28003,
  pages: [
    {
      name: 'newsdetail',
      template: 'src/customize/pages/information/template/index.html',
      entry: 'src/modules/module-information/index.js',
      title: '资讯详情',
    }
  ],
};