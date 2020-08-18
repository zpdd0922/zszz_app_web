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

  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
});

router.beforeEach((to, from, next) => {
  const pathName = to.path;
  if (pathName.indexOf('html') > 0) {
    const dataStr = pathName.replace('.html', '');
    const [
      path, id
    ] = dataStr.split('-');
    next({
      path,
      query: {
        id
      },
      replace: true
    });
  } else {
    next();
  }
});

export default router;
