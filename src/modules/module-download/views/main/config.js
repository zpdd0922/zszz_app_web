const windowGolbalConfig = window._GLOBAL_CONFIG;

const {
  downAddressIOSWeb = "",
  downAddressIOSItms = "",
  downAddressAndroid = "",
  openAddressIOS = "",
  openAddressAndroid = {}
} = windowGolbalConfig.download;

export {
  downAddressIOSWeb,
  downAddressIOSItms,
  downAddressAndroid,
  openAddressIOS,
  openAddressAndroid
};