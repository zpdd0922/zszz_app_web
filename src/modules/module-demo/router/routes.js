
const routes = [
  {
    path: "/demo",
    name: 'demo',
    component: () => import(/* webpackChunkName:"open-account-common" */ `../views/main/index.vue`),
    meta: {
      whiteAuth: true
    },
  },
];

export default routes;
