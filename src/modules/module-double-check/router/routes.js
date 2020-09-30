
const routes = [
  {
    path: "double-check-layout",
    redirect: {name: 'double-check'},
    component: () => import(/* webpackChunkName:"double-check-layout" */ `../views/layout.vue`),
    children: [
      {
        path: "/double-check",
        name: 'double-check',
        component: () => import(/* webpackChunkName:"double-check" */ `../views/main/index.vue`),
        meta: {
          whiteAuth: true
        },
      },
    
    ]
  },
];

export default routes;
