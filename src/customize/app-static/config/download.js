(function (window) {
  var GLOBAL_CONFIG = window._GLOBAL_CONFIG || {};

  GLOBAL_CONFIG.download = {
    // App 下载地址(IOS)
    downAddressIOSWeb: 'https://itunes.apple.com/app/id1225099279',
    // App 下载地址(IOS)(嵌入app形式)
    downAddressIOSItms: 'https://itunes.apple.com/app/id1225099279',
    // App 下载地址(Android)
    downAddressAndroid: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.sunline.android.sunline&g_f=991653',
    // App 打开配置(IOS)
    openAddressIOS: 'com.sunline.iossunline://',
    // App 打开配置(Android)
    openAddressAndroid: {
      intentUrl: 'com.sunline.android.sunline.hk',
      scheme: "sunline_app",
      apkInfo: {
        package: "com.sunline.android.sunline",
        // category: "android.intent.category.DEFAULT; category: ndroid.intent.category.BROWSABLE",
        category: "android.intent.category.DEFAULT",
        action: "android.intent.action.VIEW"
      },
    },
  };

  window._GLOBAL_CONFIG = GLOBAL_CONFIG;
})(window);
