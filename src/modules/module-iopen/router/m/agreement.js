// 登陆注册用户主视图
const _import = file => () => import('@/modules/module-iopen/views/' + file + '/index.vue');

// 用户登录注册路由模块
const agreementRouter = [
  {
    path: '/personal',
    name: 'personal',
    component: _import('agreement/personal'),
    meta: { title: '個人資料（私隱）條例通知' }
  },
  {
    path: '/sgt',
    name: 'sgt',
    component: _import('agreement/sgt'),
    meta: { title: '予滬港通及深港通客戶通知' }
  },
  {
    path: '/bxtrade',
    name: 'bxtrade',
    component: _import('agreement/bxtrade'),
    meta: { title: '有關中華通證券北向交易的個人資料收集聲明' }
  },
  {
    path: '/fatca',
    name: 'fatca',
    component: _import('agreement/fatca'),
    meta: { title: '个人一自我证明表格说明（FATCA及CRS）' }
  },
  {
    path: '/cash-account',
    name: 'cash-account',
    component: _import('agreement/cash-account'),
    meta: { title: '现金客户协议书' }
  },
  {
    path: '/pel',
    name: 'pel',
    component: _import('agreement/pel'),
    meta: { title: '风险披露说明书' }
  }
];

export default agreementRouter;
