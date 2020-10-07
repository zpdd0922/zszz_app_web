import i18n from '@/modules/module-iopen-extension/locale/'

// export const agreementList = () => [
//   {
//     title: i18n.t('iopenExt.confirm.customerAgreement'),
//     url: '#'
//   },
//   {
//     title: i18n.t('iopenExt.confirm.riskAgreement'),
//     url: '#'
//   },
//   {
//     title: i18n.t('iopenExt.confirm.adjectiveAuthAgreement'),
//     url: '#'
//   },
//   {
//     title: i18n.t('iopenExt.confirm.feeAgreement'),
//     url: '#'
//   },
// ]
const windowGolbalConfig = window._GLOBAL_CONFIG;

export const riskList = windowGolbalConfig.risk;
export const agreementList = windowGolbalConfig.agreements;
