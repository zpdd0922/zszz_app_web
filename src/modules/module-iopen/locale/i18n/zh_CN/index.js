import customizeI18n from '@/customize/locale/i18n/zh_CN';
import commonI18n from '@/main/locale/i18n/zh_CN';

import guide from './guide';
import comSignature from './com-signature';
import openHk from './open-hk';
import openCn from './open-cn';

export default {
  iOpen: {
    comSignature,
    common: {
      title: '线上开户',
      nextBtn: '下一步',
      idKind: {
        idCardCn: "中华人民共和国居民身份证",
        idCardHk: "香港永久居民身份证",
        idCardHkTemp: "香港居民身份证与签证身份书",
        passport: "护照",
      },
      // nationlityCode: 'AO_NATIONALITY_HK'
      nationlityCode: 'AO_NATIONALITY'
    },
    guide,
    authWay: {
      title: '认证方式',
      pageName: '选择您的认证方式',
      wayCN: '大陆CA认证',
      wayHK: '香港银行卡入金认证',
      wayOther: '线下见证',
    },
    cameraInfo: {
      btnTake: '拍摄',
      btnScan: '扫描',
      btnAlbum: '相册',
      uploadFaceTips: '拍摄人像面，请确保身份证在相框内',
      uploadBackTips: '拍摄国徽面，请确保身份证在相框内',
    },
    // openCn: {
    
    // },
    openHk,
    openCn
  }
};
