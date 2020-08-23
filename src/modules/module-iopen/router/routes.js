import onlineCnRouter from './m/online-cn';
import onlineHkRouter from './m/online-hk';

const routes = [
  {
    path: "/opa",
    redirect: {name: 'opaGuide'},
    component: () => import(/* webpackChunkName:"open-account-common" */ `../views/layout.vue`),
    children: [
      {
        path: 'guide',
        name: 'opaGuide',
        component: () => import(/* webpackChunkName:"open-account-common" */ `../views/guide/index.vue`),
        meta: {}
      },
      {
        path: 'open-way',
        name: 'opaOpenWay',
        component: () => import(/* webpackChunkName:"open-account-common" */ `../views/open-way/index.vue`),
        meta: {}
      },
      ...onlineCnRouter,
      ...onlineHkRouter,
    ]
  },
  // ...agreementRouter,
  // {
  //   path: '/update-img',
  //   name: 'update-img',
  //   component: _import('update-img'),
  //   meta: { title: '修改图片' }
  // },
  // // 补录资料
  // {
  //   path: '/supplement',
  //   name: 'supplement',
  //   redirect: '/supplement/id-card',
  //   component: SupplementInfo,
  //   children: [
  //     {
  //       name: 'id-card-sup',
  //       path: 'id-card',
  //       component: _import('supplement/id-card'),
  //       meta: { title: '身份证上传', step: 1, showProgress: true }
  //     },
  //     {
  //       name: 'id-card-info-sup',
  //       path: 'id-card-info',
  //       component: _import('supplement/id-card-info'),
  //       meta: { title: '身份证信息确认', step: 2, showProgress: true }
  //     }
  //   ]
  // },

];

export default routes;
