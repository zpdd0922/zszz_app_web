const routes = [
  {
    path: "open-margin",
    name: "margin-layout",
    redirect: { name: "margin-info-disclosure" },
    component: () =>
      import(/* webpackChunkName:"margin-layout" */ `../views/layout.vue`),
    children: [
      {
        path: "step1",
        name: "margin-info-disclosure",
        meta: {
          whiteAuth: true
        },
        component: () =>
          import(
            /* webpackChunkName:"margin-info-disclosure" */ `../views/step-info-disclosure/index.vue`
          ),
      },
      {
        path: "step2",
        name: "margin-risk",
        meta: {
          whiteAuth: true
        },

        component: () =>
          import(
            /* webpackChunkName:"margin-risk" */ `../views/step-risk/index.vue`
          ),
      },
      {
        path: "step3",
        name: "margin-confirm",
        meta: {
          whiteAuth: true
        },

        component: () =>
          import(
            /* webpackChunkName:"margin-confirm" */ `../views/step-confirm/index.vue`
          ),
      },
      // {
      //   path: "step4",
      //   name: "margin-signature",
      //   meta: {
      //     whiteAuth: true
      //   },

      //   component: () =>
      //     import(
      //       /* webpackChunkName:"margin-signature" */ `../views/step-signature/index.vue`
      //     ),
      // },
    ],
  },
];

export default routes;
