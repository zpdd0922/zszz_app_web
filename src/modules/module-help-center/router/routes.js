/* eslint-disable */

// 路由懒加载
const _import = file => () => import('@/model-help-center/views/' + file + '/index.vue');

// 路由配置表
const routers = [
  // 主页面
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页',
    },
    component: _import('home')
  },
  {
    path: '/search',
    name: 'search',
    meta: {},
    component: _import('search')
  },
  {
    path: '/list',
    name: 'list',
    meta: {},
    component: _import('list')
  },
  {
    path: '/detail',
    name: 'detail',
    meta: {},
    component: _import('detail')
  },
  {
    path: '/help-center',
    redirect: '/home'
  },
  {
    path: '/',
    redirect: '/home'
  }
];


export default routers;
