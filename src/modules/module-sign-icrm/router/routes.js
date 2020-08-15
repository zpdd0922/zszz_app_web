/*
 * @Author: Jim
 * @Date: 2019-05-24 16:29:31
 * @LastEditors  : Jim
 * @LastEditTime : 2020-01-09 15:02:37
 * @Description:
 */
// 登陆注册模块
import MainWrap from '@/modules/module-sign-icrm/views/wrap.vue';

// 路由懒加载
const _import = file => () => import('@/modules/module-sign-icrm/views/' + file + '/index.vue');

// 路由配置表
const routes = [
  {
    path: '/sign',
    name: 'sign',
    component: MainWrap,
    redirect: { name: 'login' },
    children: [
      {
        name: 'login',
        path: 'login',
        component: _import('login-by-captcha'),
        meta: {
          whiteAuth: true,
        }
      },
    ]
  }
];

export default routes;
