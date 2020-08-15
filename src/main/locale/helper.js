/*
 * @Author: Jim
 * @Date: 2019-03-20 10:20:43
 * @LastEditors  : Jim
 * @LastEditTime : 2019-12-18 16:15:49
 * @Description:
 */
import { getURLParameters } from '@/main/utils/format/url';
import cacheLocalStorage from '@/main/utils/cache/localstorage';
import zhCN from './i18n/zh_CN';
import zhHK from './i18n/zh_HK';
// import enUS from './i18n/en_US';

const CUSTOMIZE_GLOBAL_DEFINE = JSON.parse(process.env.VUE_APP_CUSTOMIZE_GLOBAL_DEFINE);
const customizeDefaultLang = CUSTOMIZE_GLOBAL_DEFINE.DEFAULT_LANG || "";

// 格式化真实语言
const formatLang = (lang) => {
  if (typeof lang !== 'string' || lang === '') {
    return "";
  }
  if (lang === 'zh-CN' || lang === 'zh_CN' || lang === 'zh') {
    return 'zh_CN';
  }
  if (lang.startsWith('zh')) {
    return 'zh_HK';
  }

  return "";
}

// 获取地址栏语言
const getLangFromUrl = () => {
  const urlParams = getURLParameters();
  return formatLang(urlParams.lang);
}

// 获取本地缓存语言
const getLangFromCache = () => {
  const cacheLang = cacheLocalStorage.get('lang');
  return formatLang(cacheLang);
}


// 获取系统语言
const getLangFromSystem = () => {
  const systemLang = navigator.language || navigator.userLanguage;
  return formatLang(systemLang);
}

export function getDefaultLang() {
  const langFromUrl = getLangFromUrl();
  if (langFromUrl !== '') {
    return cacheLocalStorage.has("lang", langFromUrl)
  }

  const langFromCache = getLangFromCache();
  if (langFromCache !== '') {
    return cacheLocalStorage.has("lang", langFromCache)
  }

  const langFromSystem = getLangFromSystem();
  if (langFromSystem !== '') {
    return cacheLocalStorage.has("lang", langFromSystem)
  }

  return cacheLocalStorage.has("lang", customizeDefaultLang)
};

export function getMessage(key = "failBusy", lang) {
  let localeInfo = zhCN;
  if (lang === 'zh_HK') {
    localeInfo = zhHK;
  }

  return _.get(localeInfo, ['common', 'toast', key]);
}

export function setLanguage(langStr) {
  const realLangStr = formatLang(langStr);
  if (realLangStr !== "") {
    return cacheLocalStorage.has("lang", realLangStr)
  }
}