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
  outputDir: 'dist/iaccount',
  serverPort: 8905,
  pages: [
    {
      name: 'index',
      template: 'src/customize/pages/iaccount/template/index.html',
      entry: 'src/modules/module-iaccount/index.js',
      title: '證券服務',
    },
    {
      name: 'index_iopen',
      template: 'src/customize/pages/iopen/template/index.html',
      entry: 'src/modules/module-iopen/index.js',
      title: '开户',
    },
    {
      name: 'index_iopen_ext',
      template: 'src/customize/pages/iopen-extension/template/index.html',
      entry: 'src/modules/module-iopen-extension/index.js',
      title: '保证金账户增开',
    },
    {
      name: 'index_double_check',
      template: 'src/customize/pages/double-check/template/index.html',
      entry: 'src/modules/module-double-check/index.js',
      title: '二重认证',
    }

  ],
};
