import customizeI18n from '@/customize/locale/i18n/zh_HK';
import commonI18n from '@/main/locale/i18n/zh_HK';

import guide from './guide';
import openHk from './open-hk';
import openCn from './open-cn';
import comSignature from './com-signature';

export default {
  iOpen: {
    comSignature,
    common: {
      title: '綫上開戶',
      nextBtn: '下一步',
      idKind: {
        idCardCn: "中華人民共和國居民身份證",
        idCardHk: "香港永久居民身份證",
        idCardHkTemp: "香港居民身份證與簽證身份書",
        passport: "護照",
      },
      // nationlityCode: 'AO_NATIONALITY_HK'
      nationlityCode: 'AO_NATIONALITY'
    },
    guide,
    authWay: {
      title: '認證方式',
      pageName: '選擇您的認證方式',
      wayCN: '大陸CA認證',
      wayHK: '香港銀行卡入金認證',
      wayOther: '線下見證',
    },
    cameraInfo: {
      btnTake: '拍攝',
      btnScan: '掃描',
      btnAlbum: '相冊',
      uploadFaceTips: '拍攝人像面，請確保身份證在相框內',
      uploadBackTips: '拍攝國徽面，請確保身份證在相框內',
    },
    // openCn: {
    
    // },
    openHk,
    openCn
  },
};
