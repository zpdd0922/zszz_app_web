import Vue from 'vue';
import VueRouter from 'vue-router';

import signRouter from './routes.js';
import AppWrap from '../views/wrap.vue';

Vue.use(VueRouter);

/**
 * mode: 路由模式 hash：/#/ -- history：/
 */
const router = new VueRouter({
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: AppWrap,
      redirect: { name: 'register' },
      children: signRouter
    },
    {
      path: "*",
      redirect: 'register'
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
