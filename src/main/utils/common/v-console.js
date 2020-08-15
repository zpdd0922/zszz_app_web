/*
 * @Author: Jim
 * @Date: 2019-03-20 10:20:42
 * @LastEditors: Jim
 * @LastEditTime: 2019-12-18 00:07:33
 * @Description:
 */
const envConfig = window._GLOBAL_ENV_CONFIG || {};

if (envConfig.debug) {
  const VConsole = require('vconsole/dist/vconsole.min.js');
  const vConsole = new VConsole();
  console.log(vConsole.version);
}
