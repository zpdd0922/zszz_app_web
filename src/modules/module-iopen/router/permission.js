/*
 * @Author: Jim
 * @Date: 2019-12-16 18:02:23
 * @LastEditors  : Jim
 * @LastEditTime : 2020-01-14 10:12:27
 * @Description:
 */
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// import { Locale } from 'cube-ui'

import uaInfo from '@/main/utils/common/ua-info';

import router from './index';
import store from '../store';
import auth from '@/main/request/utils/auth';
import BroadCast, { BROADCAST_ENUMS } from '@/main/utils/common/broadcast';
import { getUserInfoAPP } from '@/main/utils/native-app/index';
import { setLanguage } from '@/main/locale/helper'
import i18n from '@/modules/module-iopen/locale/';
// import cubeDefaultLang from '@/main/locale/zh-cu-TW'

BroadCast.onmessage(BROADCAST_ENUMS.LOGIN_EXPRIS, () => {
  store.dispatch("fedLogout")
    .then(() => {
      console.log(router)
      router.replace({
        name: 'loginByCaptcha'
      });
    })
});


router.beforeEach((to, from, next) => {

  store.commit('updateLoadingStatus', { isLoading: true });

  // 判断当前环境
  // 白名单页

  console.log(uaInfo)
  if (uaInfo.isApp()) {
    getUserInfoAPP({
      success: (res) => {
        // 并修改手机字段统一为 --> phoneNum
        const result = JSON.parse(res.data)
        const { phoneNumber: phoneNum, language } = result
        let lang = 'zh_HK';
        switch (language) {
          case 'zh-Hant':
          case 'zh_HK':
            lang = 'zh_HK'
            // cube-ui内部组件国际化
            // Locale.use('cu-TW', cubeDefaultLang)
            break
          case 'zh-Hans':
          case 'zh_CN':
            lang = 'zh_CN'
            break
          default:
            lang = 'zh_HK'
          // Locale.use('cu-TW', cubeDefaultLang)
        }

        console.log(1232, lang)
        i18n.locale = lang;
        setLanguage(lang)

        store.dispatch('appLogin', { ...result, phoneNum })
          .then(() => {
            console.log(1232)
            next()
          })
      }
    })
  } else {
    if (to.matched.some(res => res.meta.whiteAuth)) {
      next();
    } else {
      // 用户信息
      const token = auth.getAuthSession();
      if (token) {
        // 非APP内，检测用户信息是否失效
        next();
      } else {
        // 跳转到登录界面
        store.commit('updateLoadingStatus', { isLoading: false });
        if (from.name !== 'login') {
          NProgress.start();
        }
        next({
          name: 'login',
          query: { redirect: to.fullPath },
          replace: true
        });
      }
    }
  }
});

router.afterEach((to, from) => {
  store.commit('updateLoadingStatus', { isLoading: false });
  NProgress.done();
});
