/*
 * @Author: Jim
 * @Date: 2019-12-16 18:02:23
 * @LastEditors  : Jim
 * @LastEditTime : 2020-01-14 10:12:27
 * @Description:
 */
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import router from './index';
import store from '../store';
import auth from '@/main/request/utils/auth';
import BroadCast, { BROADCAST_ENUMS } from '@/main/utils/common/broadcast';

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
});

router.afterEach((to, from) => {
  store.commit('updateLoadingStatus', { isLoading: false });
  NProgress.done();
});
