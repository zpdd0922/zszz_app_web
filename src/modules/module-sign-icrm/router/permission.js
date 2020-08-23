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
import store from '../store/index';
import auth from '@/main/request/utils/auth';
import UaInfo from '@/main/utils/common/ua-info';
import { getUserInfoAPP } from '@/main/utils/native-app/index';

// 是否APP环境
const isApp = UaInfo.isApp();

router.beforeEach((to, from, next) => {
  // if(to.name != "login"){
  //   console.log(123)
  //   next({
  //     name: 'login'
  //   })
  // }else{
  //   next();
  // }

  store.commit('updateLoadingStatus', { isLoading: true });
  // 判断当前环境
  if (isApp) {
    // APP环境直接获取用户信息 -- 不存缓存
    getUserInfoAPP({
      success: (res) => {
        // 并修改手机字段统一为 --> phoneNum
        const result = JSON.parse(res.data);
        const { phoneNumber: phoneNum } = result;
        store.dispatch('appLogin', { ...result, phoneNum })
          .then(() => {
            next();
          });
      }
    });
  } else {
    // 白名单页
    if (to.matched.some(res => res.meta.whiteAuth)) {
      next();
    } else {
      // 用户信息
      const userInfo = auth.getLocalUserInfo();
      if (userInfo) {
        // 非APP内，检测用户信息是否失效
        store.dispatch('checkLogin')
          .then(() => {
            next();
          })
          .catch(() => {
            store.dispatch('fedLogout').then(() => {
              location.reload();
            });
          });
      } else {
        // 跳转到登录界面
        store.commit('updateLoadingStatus', { isLoading: false });
        // 根据编译环境区分是否调用本项目内登录注册模块
        if (from.name === 'login') {
          next(false);
        } else {
          NProgress.start();
          next({
            name: 'login',
            replace: true
          });
        }
      }
    }
  }
});

router.afterEach((to, from) => {
  console.log('after', from, to);
  store.commit('updateLoadingStatus', { isLoading: false });
  NProgress.done();
});
