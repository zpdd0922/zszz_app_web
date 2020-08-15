import Vue from 'vue';
import VueRouter from 'vue-router';

import opaRouter from '@/modules/module-iopen/router/routes.js';
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
      redirect: 'opa',
      children: [{
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName:"open-account-common" */ `../views/home/index.vue`),
        meta: { whiteAuth: true }
      },
      ...signRouter,
      ...opaRouter,
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
