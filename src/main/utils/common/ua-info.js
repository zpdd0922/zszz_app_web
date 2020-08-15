/**
 * Changed by Amg on 2018/08/15
 */
/* eslint import/prefer-default-export:off */
/* eslint no-useless-escape:off */

// app-userAgent Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15F79\Unidax-iOS/v1;x86_64;11.4

const CUSTOMIZE_GLOBAL_DEFINE = JSON.parse(process.env.VUE_APP_CUSTOMIZE_GLOBAL_DEFINE);

const checkVersion = (version1 = [], version2 = []) => {
  if (!Array.isArray(version1) || !Array.isArray(version2)) return false;
  const [
    a1 = '0', b1 = '0', c1 = '0'
  ] = version1;
  const [
    a2 = '0', b2 = '0', c2 = '0'
  ] = version2;

  const a = parseInt(a1, 10) - parseInt(a2, 10);
  const b = parseInt(b1, 10) - parseInt(b2, 10);
  const c = parseInt(c1, 10) - parseInt(c2, 10);

  return a > 0 || (a === 0 && (b > 0 || (b === 0 && c >= 0)));
};

class UserAgent {
  constructor() {
    this.ua = navigator.userAgent;
    this.uaLower = this.ua.toLowerCase();
    this.s = {};
    const appUAStr = this.uaLower.substr(this.uaLower.search(`/${CUSTOMIZE_GLOBAL_DEFINE.APP_FLAG}/`)) || '';
    const appUAArr = appUAStr.split(';');
    const versionStr = appUAArr[0].split('/')[1] || '';
    this.version = versionStr.replace('v', '').split('.') || [];
  }

  isIOS() {
    return ((/(iphone|ipad|ipod|ios)/).test(this.uaLower));
  }

  isAndroid() {
    return ((/android/).test(this.uaLower));
  }

  isWX() {
    return (/micromessenger/).test(this.uaLower);
  }

  isWB() {
    return (/weibo/).test(this.uaLower);
  }

  isQQ() {
    return (/\sQQ/i).test(this.uaLower);
  }

  isMobile() {
    return !!this.ua.match(/AppleWebKit.*Mobile.*/);
  }

  isChrome() {
    return this.ua.match(/Chrome\/([\d.]+)/) || this.ua.match(/CriOS\/([\d.]+)/);
  }

  isMobileQQ() {
    return (
      /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(this.ua) ||
      /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(this.ua)
    );
  }

  isAppName(name) {
    return this.ua.indexOf(name) !== -1;
  }
  
  isCustomApp() {
    return this.isAppName(CUSTOMIZE_GLOBAL_DEFINE.CUSTOM_APP_FLAG);
  }

  isApp() {
    return this.isAppName(CUSTOMIZE_GLOBAL_DEFINE.APP_FLAG);
  }
  

  isIOSApp() {
    return this.isIOS() && this.isApp();
  }

  isUnderIOS8() {
    const OS_INFO = this.ua.match(/OS (\d+)_(\d+)_?(\d+)?/);
    if (!OS_INFO) return false;
    return parseInt(OS_INFO[1], 10) <= 8;
  }

  isOldVersion() {
    if (!this.version || this.version === '') return false;
    // return parseFloat(this.version) >= parseFloat(2);
    return checkVersion([
      '0', '0', '2'
    ], this.version);
  }

  isNewVersion(appVersion) {
    if (!this.version || this.version === '') return false;
    if (!appVersion || appVersion === '') return false;

    return checkVersion(this.version, appVersion.split('.'));
  }
}

export default new UserAgent();
