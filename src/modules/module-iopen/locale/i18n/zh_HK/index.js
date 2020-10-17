import customizeI18n from '@/customize/locale/i18n/zh_HK';
import commonI18n from '@/main/locale/i18n/zh_HK';

import guide from './guide';
import openHk from './open-hk';
import openCn from './open-cn';
import comSignature from './com-signature';
import components from "./components";

export default {
  iOpen: {
    comSignature,
    components,
    common: {
      title: '綫上開戶',
      nextBtn: '下一步',
      idKind: {
        idCardCn: "中華人民共和國居民身份證",
        idCardHk: "香港永久居民身份證",
        idCardHkTemp: "香港居民身份證與簽證身份書",
        passport: "護照",
      },
      nationlityCode: 'AO_NATIONALITY_HK',
      warn: {
        emptyMsg: '必填信息不能為空',
      }

    },
    guide,
    authWay: {
      title: '認證方式',
      pageName: '選擇您的認證方式',
      wayCN: '數字證書認證',
      wayCNTips: '適用於大陸身份證持有者',
      wayHK: '香港銀行账户入金認證',
      wayHKTips: '適用於香港及其他地區身份',
      wayOther: '線下見證',
    },
    cameraInfo: {
      btnTake: '拍攝',
      btnScan: '掃描',
      btnAlbum: '相冊',
      uploadFaceTips: '拍攝人像面，請確保身份證在相框內',
      uploadBackTips: '拍攝國徽面，請確保身份證在相框內',
      tipsDefault: '請確保拍攝物體清晰、無反光',

    },
    uploadPicinfo: {
      loading: '加載中',
      zipping: '壓縮中',
      reload: '重新上傳',
      },
    // openCn: {
    
    // },
    openHk,
    openCn
  },
};
