import customizeI18n from "@/customize/locale/i18n/zh_CN";
import commonI18n from "@/main/locale/i18n/zh_CN";

import guide from "./guide";
import comSignature from "./com-signature";
import openHk from "./open-hk";
import openCn from "./open-cn";
import components from "./components";

export default {
  iOpen: {
    comSignature,
    components,
    common: {
      title: "线上开户",
      nextBtn: "下一步",
      idKind: {
        idCardCn: "中华人民共和国居民身份证",
        idCardHk: "香港永久居民身份证",
        idCardHkTemp: "香港居民身份证与签证身份书",
        passport: "护照",
      },
      nationlityCode: "AO_NATIONALITY",
      warn: {
        emptyMsg: '必填信息不能为空'
      }
    },
    guide,
    authWay: {
      title: "认证方式",
      pageName: "选择您的认证方式",
      wayCN: "数字证书认证",
      wayCNTips: "适用于大陆身份证持有者",
      wayHK: "香港银行账户入金认证",
      wayHKTips: "适用于香港及其他地区身份",
      wayOther: "线下见证",
    },
    cameraInfo: {
      btnTake: "拍摄",
      btnScan: "扫描",
      btnAlbum: "相册",
      uploadFaceTips: "拍摄人像面，请确保身份证在相框内",
      uploadBackTips: "拍摄国徽面，请确保身份证在相框内",
      tipsDefault: "请确保拍摄物体清晰、无反光",
    },
    uploadPicinfo: {
      loading: "加载中",
      zipping: "压缩中",
      reload: "重新上传",
    },
    // openCn: {

    // },
    openHk,
    openCn,
  },
};
