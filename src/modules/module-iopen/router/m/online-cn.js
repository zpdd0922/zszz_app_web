import OnlineCN from '@/modules/module-iopen/views/online-cn/layout.vue';
const _import = (path, file = 'index') => () => import(/* webpackChunkName:"open-account-cn" */ `../../views/online-cn/${path}/${file}.vue`);

const onlineCnRouter = [
  {
    path: 'online-cn/:origin(h5|app)',
    name: 'opaOnlineCn',
    redirect: 'online-cn/:origin(h5|app)/step1',
    component: OnlineCN,
    children: [
      {
        name: 'opaStep1',
        path: 'step1',
        component: _import('step-select-account'),
        meta: { pageName: 'iOpen.openCn.selectAccount.pageName', step: 1, nextStep: 'opaStep2' }
      },
      {
        name: 'opaStep2',
        path: 'step2',
        component: _import('step-id-card'),
        meta: { pageName: 'iOpen.openCn.idCard.pageName', step: 2, nextStep: 'opaStep3' }
      },
      {
        name: 'opaStep3',
        path: 'step3',
        component: _import('step-id-card-info'),
        meta: { pageName: 'iOpen.openCn.idCardInfo.pageName', step: 3, nextStep: 'opaStep4' }
      },
      {
        name: 'opaStep4',
        path: 'step4',
        component: _import('step-bank-card'),
        meta: { pageName: 'iOpen.openCn.bankCard.pageName', step: 4, nextStep: 'opaStep5' }
      },
      {
        name: 'opaStep5',
        path: 'step5',
        component: _import('step-info-contact'),
        meta: { pageName: 'iOpen.openCn.infoContact.pageName', step: 5, nextStep: 'opaStep6' }
      },
      {
        name: 'opaStep6',
        path: 'step6',
        component: _import('step-risk'),
        meta: { pageName: 'iOpen.openCn.risk.pageName', step: 6, nextStep: 'opaStep7' }
      },
      {
        name: 'opaStep7',
        path: 'step7',
        component: _import('step-info-disclosure'),
        meta: { pageName: 'iOpen.openCn.infoDisclosure.pageName', step: 7, nextStep: 'opaStep8' }
      },
      {
        name: 'opaStep8',
        path: 'step8',
        component: _import('step-info-declare'),
        meta: { pageName: 'iOpen.openCn.infoDeclare.pageName', step: 8, nextStep: 'opaStep9' }
      },
      {
        name: 'opaStep9',
        path: 'step9',
        component: _import('step-info-finance'),
        meta: { pageName: 'iOpen.openCn.infoFinance.pageName', step: 9, nextStep: 'opaStep10' }
      },
      {
        name: 'opaStep10',
        path: 'step10',
        component: _import('step-info-experience'),
        meta: { pageName: 'iOpen.openCn.infoExperience.pageName', step: 10, nextStep: 'opaStep11' }
      },
      {
        name: 'opaStep11',
        path: 'step11',
        component: _import('step-avatar-before'),
        meta: { pageName: 'iOpen.openCn.avatarBefore.pageName', step: 11, nextStep: 'opaStep12Finger' }
      },
      {
        name: 'opaStep12Finger',
        path: 'step12-finger',
        component: _import('step-avatar-picture', 'finger'),
        meta: { pageName: 'iOpen.openCn.avatarPicture.pageNameFinger', step: 12, nextStep: 'opaStep12Card' }
      },
      {
        name: 'opaStep12Card',
        path: 'step12-card',
        component: _import('step-avatar-picture', 'card'),
        meta: { pageName: 'iOpen.openCn.avatarPicture.pageNameCard', step: 12, nextStep: 'opaStep12Head' }
      },
      {
        name: 'opaStep12Head',
        path: 'step12-head',
        component: _import('step-avatar-picture', 'head'),
        meta: { pageName: 'iOpen.openCn.avatarPicture.pageNameHead', step: 12, nextStep: 'opaStep13' }
      },
      {
        name: 'opaStep13',
        path: 'step13',
        component: _import('step-signature'),
        meta: { pageName: 'iOpen.openCn.selectAccount.pageName', step: 13, isHeader: false, isFooter: false, nextStep: 'opaStep14' }
      },
      {
        name: 'opaStep14',
        path: 'step14',
        component: _import('step-protocol-confirm'),
        meta: { pageName: 'iOpen.openCn.protocolConfirm.pageName', step: 14 , signatureStep: 'opaStep13'}
      },
    ]
  }
];

export default onlineCnRouter;
