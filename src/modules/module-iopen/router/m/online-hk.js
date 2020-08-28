import OnlineHK from '@/modules/module-iopen/views/online-hk/layout.vue';

const _import = (path, file = 'index') => () => import(/* webpackChunkName:"open-account-hk" */ `../../views/online-hk/${path}/${file}.vue`);

const onlineHkRouter = [
  {
    path: 'online-hk/:origin(h5|app)',
    name: 'opaOnlineHk',
    redirect: 'online-hk/:origin(h5|app)/step1',
    component: OnlineHK,
    children: [
      {
        name: 'opaStep1-hk',
        path: 'step1',
        component: _import('step-select-account'),
        meta: { pageName: 'iOpen.openHk.selectAccount.pageName', step: 1, nextStep: 'opaStep2-hk' }
      },
      {
        name: 'opaStep2-hk',
        path: 'step2',
        component: _import('step-id-card'),
        meta: { pageName: 'iOpen.openHk.idCard.pageName', step: 2, nextStep: 'opaStep3-hk' }
      },
      {
        name: 'opaStep3-hk',
        path: 'step3',
        component: _import('step-id-card-info'),
        meta: { pageName: 'iOpen.openHk.idCardInfo.pageName', step: 3, nextStep: 'opaStep4-hk' }
      },
      {
        name: 'opaStep4-hk',
        path: 'step4',
        component: _import('step-bank-card'),
        meta: { pageName: 'iOpen.openHk.bankCard.pageName', step: 4, nextStep: 'opaStep5-hk' }
      },
      {
        name: 'opaStep5-hk',
        path: 'step5',
        component: _import('step-info-contact'),
        meta: { pageName: 'iOpen.openHk.infoContact.pageName', step: 5, nextStep: 'opaStep6-hk' }
      },
      {
        name: 'opaStep6-hk',
        path: 'step6',
        component: _import('step-risk'),
        meta: { pageName: 'iOpen.openHk.risk.pageName', step: 6, nextStep: 'opaStep7-hk' }
      },
      {
        name: 'opaStep7-hk',
        path: 'step7',
        component: _import('step-info-disclosure'),
        meta: { pageName: 'iOpen.openHk.infoDisclosure.pageName', step: 7, nextStep: 'opaStep8-hk' }
      },
      {
        name: 'opaStep8-hk',
        path: 'step8',
        component: _import('step-info-declare'),
        meta: { pageName: 'iOpen.openHk.infoDeclare.pageName', step: 8, nextStep: 'opaStep9-hk' }
      },
      {
        name: 'opaStep9-hk',
        path: 'step9',
        component: _import('step-info-finance'),
        meta: { pageName: 'iOpen.openHk.infoFinance.pageName', step: 9, nextStep: 'opaStep10-hk' }
      },
      {
        name: 'opaStep10-hk',
        path: 'step10',
        component: _import('step-info-experience'),
        meta: { pageName: 'iOpen.openHk.infoExperience.pageName', step: 10, nextStep: 'opaStep11-hk' }
      },
      {
        name: 'opaStep11-hk',
        path: 'step11',
        component: _import('step-signature'),
        meta: { pageName: 'iOpen.openHk.selectAccount.pageName', step: 11, nextStep: 'opaStep12-hk', isHeader: false, isFooter: false }
      },
      {
        name: 'opaStep12-hk',
        path: 'step12',
        component: _import('step-protocol-confirm'),
        meta: { pageName: 'iOpen.openHk.protocolConfirm.pageName', step: 12, signatureStep: 'opaStep11-hk' }
      },
    ]
  }
];

export default onlineHkRouter;
