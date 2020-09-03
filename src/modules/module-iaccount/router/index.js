import Vue from 'vue';
import VueRouter from 'vue-router';

import iaccountRouter from '@/modules/module-iaccount/router/routes.js';
import signRouter from '@/modules/module-sign-icrm/router/routes.js';
import AppWrap from '../wrap.vue';

Vue.use(VueRouter);

/**
 * mode: 路由模式 hash：/#/ -- history：/
 */
const router = new VueRouter({
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: AppWrap,
      redirect: 'iaccount',
      children: [
      ...signRouter,
      ...iaccountRouter,
      ]
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
