/*
 * @Author: Jim
 * @Date: 2019-12-17 12:08:11
 * @LastEditors: Jim
 * @LastEditTime: 2019-12-17 13:04:55
 * @Description:
 */
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import openAccountZhCN from '@/modules/module-iopen/locale/i18n/zh_CN';
import openAccountEnUS from '@/modules/module-iopen/locale/i18n/en_US';
import openAccountZhHK from '@/modules/module-iopen/locale/i18n/zh_HK';
import commonZhCN from '@/main/locale/i18n/zh_CN';
import commonEnUS from '@/main/locale/i18n/en_US';
import commonZhHK from '@/main/locale/i18n/zh_HK';
import customizeZhCN from '@/customize/locale/i18n/zh_CN';
import customizeEnUS from '@/customize/locale/i18n/en_US';
import customizeZhHK from '@/customize/locale/i18n/zh_HK';
import signZhCN from '@/modules/module-sign-icrm/locale/i18n/zh_CN';
import signEnUS from '@/modules/module-sign-icrm/locale/i18n/en_US';
import signZhHK from '@/modules/module-sign-icrm/locale/i18n/zh_HK';
import { getDefaultLang } from '@/main/locale/helper';

Vue.use(VueI18n);

const lang = getDefaultLang();

export default new VueI18n({
  locale: lang,
  messages: {
    zh_CN: {
      ...commonZhCN,
      ...customizeZhCN,
      ...signZhCN,
      ...openAccountZhCN,
      lan: 'zh_CN'
    },
    en_US: {
      ...commonEnUS,
      ...customizeEnUS,
      ...signEnUS,
      ...openAccountEnUS,
      lan: 'zh_HK'
    },
    zh_HK: {
      ...commonZhHK,
      ...customizeZhHK,
      ...signZhHK,
      ...openAccountZhHK,
      lan: 'zh_HK'
    }
  }
});
