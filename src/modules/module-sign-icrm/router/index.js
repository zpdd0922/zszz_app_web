/*
 * @Author: Jim
 * @Date: 2019-05-24 16:29:31
 * @LastEditors: Jim
 * @LastEditTime: 2019-12-17 13:27:08
 * @Description:
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';
Vue.use(VueRouter);

/**
 * mode: 路由模式 hash：/#/ -- history：/
 */
const router = new VueRouter({
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes: [
    ...routes,
    {
      path: '*',
      redirect: '/sign'
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

export default router;
