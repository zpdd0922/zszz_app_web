/*
 * @Author: Jim
 * @Date: 2019-12-17 12:08:11
 * @LastEditors: Jim
 * @LastEditTime: 2019-12-17 13:04:55
 * @Description:
 */
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import commonZhCN from '@/main/locale/i18n/zh_CN';
import commonEnUS from '@/main/locale/i18n/en_US';
import commonZhHK from '@/main/locale/i18n/zh_HK';
import customizeZhCN from '@/customize/locale/i18n/zh_CN';
import customizeEnUS from '@/customize/locale/i18n/en_US';
import customizeZhHK from '@/customize/locale/i18n/zh_HK';
import iccountZhCN from '@/modules/module-iaccount/locale/i18n/zh_CN';
import iccountEnUS from '@/modules/module-iaccount/locale/i18n/en_US';
import iccounthHK from '@/modules/module-iaccount/locale/i18n/zh_HK';
import iopenExtZhCN from '@/modules/module-iopen-extension/locale/i18n/zh_CN';
import iopenExtEnUS from '@/modules/module-iopen-extension/locale/i18n/en_US';
import iopenExtZhHK from '@/modules/module-iopen-extension/locale/i18n/zh_HK';
import iopenZhCN from '@/modules/module-iopen/locale/i18n/zh_CN';
import iopenEnUS from '@/modules/module-iopen/locale/i18n/en_US';
import iopenZhHK from '@/modules/module-iopen/locale/i18n/zh_HK';
import signZhCN from '@/modules/module-sign/locale/i18n/zh_CN';
import signEnUS from '@/modules/module-sign/locale/i18n/en_US';
import signZhHK from '@/modules/module-sign/locale/i18n/zh_HK';
import { getDefaultLang } from '@/main/locale/helper';

Vue.use(VueI18n);

const lang = getDefaultLang();

export default new VueI18n({
  locale: lang,
  messages: {
    zh_CN: {
      ...commonZhCN,
      ...customizeZhCN,
      ...iccountZhCN,
      // ...iopenZhCN,
      ...iopenExtZhCN,
      ...signZhCN,
      lan: 'zh_CN'
    },
    en_US: {
      ...commonEnUS,
      ...customizeEnUS,
      ...iccountEnUS,
      // ...iopenEnUS,
      ...iopenExtEnUS,
      ...signEnUS,
      lan: 'en_US'
    },
    zh_HK: {
      ...commonZhHK,
      ...customizeZhHK,
      ...iccounthHK,
      // ...iopenZhHK,
      ...iopenExtZhHK,
      ...signZhHK,
      lan: 'zh_HK'
    }
  }
});
