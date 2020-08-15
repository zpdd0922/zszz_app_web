/*
 * @Author: Jim
 * @Date: 2019-12-17 23:28:32
 * @LastEditors  : Jim
 * @LastEditTime : 2020-01-09 15:26:39
 * @Description: 
 */
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
import commonZhHK from '@/main/locale/i18n/zh_HK';
import signZhCN from '@/modules/module-sign-icrm/locale/i18n/zh_CN';
import signZhHK from '@/modules/module-sign-icrm/locale/i18n/zh_HK';
import { getDefaultLang } from '@/main/locale/helper';

Vue.use(VueI18n);

const lang = getDefaultLang();

export default new VueI18n({
  locale: lang,
  messages: {
    zh_CN: {
      ...commonZhCN,
      ...signZhCN,
      lan: 'zh_CN'
    },
    zh_HK: {
      ...commonZhHK,
      ...signZhHK,
      lan: 'zh_HK'
    }
  }
});
