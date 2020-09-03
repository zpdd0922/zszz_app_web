(function (window) {
  var GLOBAL_ENV_CONFIG = {
    debug: false,
    // serverUser: 'http://106.52.75.112:6003',
    serverUser: 'http://localhost:6012',
    // serveriOpen: 'http://192.168.1.251:8901/securities',
    serveriOpen: 'http://106.52.75.112:6003',
    // serverInformation: 'https://sns.9fstock.com:9003/',
    serverInformation: 'http://106.52.75.112:6003',
    // serverHelpCenter: 'https://sns.9fstock.com:9003/',
    serverHelpCenter: 'http://106.52.75.112:6003',
    serverDocument: '',
    webSign: './sign.html',
    webIOpen: './iopen.html',
    webDownload: './download.html',
    webInformation: './information.html',
    webSign: './sign.html',
    webHelpCenter: '',
  };

  window._GLOBAL_ENV_CONFIG = GLOBAL_ENV_CONFIG;
})(window);

