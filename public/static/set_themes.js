/* eslint-disable */

// TODO: 优化换肤逻辑
(function () {
  function setDefaultTheme() {

    var urlParam = window._STATIC_LIBS_COMMONJS.getUrlParam();
    var urlTheme = urlParam.theme;
    if (urlTheme && window._themeURL["theme-" + urlTheme]) {
      localStorage.setItem('theme-type', urlTheme);
    } else if (!localStorage.getItem('theme-type')) {
      localStorage.setItem('theme-type', 'default');
    }

    var theme = localStorage.getItem('theme-type');
    var links = window._themeURL["theme-" + theme];
    var themeCss = document.createElement('link');

    themeCss.rel = "stylesheet";
    themeCss.href = links;
    document.head.appendChild(themeCss);
  }

  if (typeof setDefaultTheme === 'function') {
    setDefaultTheme();
    // window._common_js = {};
    // setDefaultTheme = null;
  }
})(window);