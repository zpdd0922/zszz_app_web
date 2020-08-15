import Vue from 'vue';
import VueI18n from 'vue-i18n';
import zhCN from './i18n/zh_CN';
import enUS from './i18n/en_US';
import zhHK from './i18n/zh_HK';
import commonZhCN from '@/common/locale/zh';
import commonEnUS from '@/common/locale/en';
import commonZhHK from '@/common/locale/el';
import getDefaultLang from '@/common/locale/default_language';

Vue.use(VueI18n);

const lang = getDefaultLang();

export const i18n = new VueI18n({
  locale: lang,
  messages: {
    zh_CN: {
      ...zhCN,
      ...commonZhCN,
      lan: 'zh_CN'
    },
    en_US: {
      ...enUS,
      ...commonEnUS,
      lan: 'en_US'
    },
    el_GR: {
      ...zhHK,
      ...commonZhHK,
      lan: 'el_GR'
    }
  }
});

export function changeLanguage(lang) {
  i18n.locale = lang;
  localStorage.setItem('lan', lang);
}
