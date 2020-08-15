/**
 * Created by fighterzhou on 2018/6/6.
 */
/* eslint-disable */

(function () {
  var STATIC_LIBS_COMMONJS = window._STATIC_LIBS_COMMONJS || {};

  function getUrlParam(url) {
    var urls = url || location.href; // 取得整个地址栏

    var arrList = urls.split('#');

    var paramData = {};

    for (var i = 0; i < arrList.length; i++) {
      var str = arrList[i]; // 取得整个地址栏
      var num = str.indexOf('?');
      str = str.substr(num + 1); // 取得所有参数   stringvar.substr(start [, length ]
      if (num > -1) {
        var arr = str.split('&'); // 各个参数放到数组里
        for (var j = 0; j < arr.length; j += 1) {
          var n = arr[j].indexOf('=');
          if (n > 0) {
            // "&key=value" 键值对
            var key = arr[j].substring(0, n);
            var value = arr[j].substr(n + 1);
            paramData[key] = decodeURIComponent(value);
          } else {
            // "&key" 仅标识
            var key = arr[j];
            if (key !== '') paramData[key] = true;
          }
        }
      }
    }
    return paramData;
  }
  STATIC_LIBS_COMMONJS.getUrlParam = getUrlParam;
  
  window._STATIC_LIBS_COMMONJS = STATIC_LIBS_COMMONJS;

})(window);