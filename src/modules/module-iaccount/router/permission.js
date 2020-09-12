/*
 * @Author: Jim
 * @Date: 2019-12-16 18:02:23
 * @LastEditors  : Jim
 * @LastEditTime : 2020-01-14 10:12:27
 * @Description:
 */
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import uaInfo from '@/main/utils/common/ua-info';

import router from './index';
import store from '../store';
import auth from '@/main/request/utils/auth';
import BroadCast, { BROADCAST_ENUMS } from '@/main/utils/common/broadcast';
import { getUserInfoAPP } from '@/main/utils/native-app/index';
import { setLanguage } from '@/main/locale/helper'
import i18n from '@/modules/module-iaccount/locale/';

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
  // 判断当前环境
  const pathName = to.path;
  if (pathName.indexOf('/security-service') != -1) {
    if (pathName.indexOf("deposit") != -1) {
      next({
        name: 'sec-funds-deposit',
        replace: true
      });
    }
    else
      if (pathName.indexOf("withdraw") != -1) {
        next({
          name: 'sec-funds-withdraw',
          replace: true
        });
      }
      else {
        next({
          name: 'sec-home',
          replace: true
        });
      }

  } else {
    // 白名单页
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

          i18n.locale = lang;
          setLanguage(lang)

          store.dispatch('appLogin', { ...result, phoneNum })
            .then(() => {
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
  }
});

router.afterEach((to, from) => {
  store.commit('updateLoadingStatus', { isLoading: false });
  NProgress.done();
});
