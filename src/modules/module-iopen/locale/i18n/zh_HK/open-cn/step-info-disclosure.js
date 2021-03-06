import customizeI18n from "@/customize/locale/i18n/zh_HK";
import commonI18n from "@/main/locale/i18n/zh_HK";

export default {
  pageName: "身份披露",
  nextBtn: "下一步",
  other: {
    declareTitle: "身份資料申報",
    greenCardTitle: "美國居民身份申報",
    isAccountOwner: "本人是該帳戶之最終實益擁有人。",
    otherOwnerName: "姓名",
    otherOwnerCardType: "證件類型",
    otherOwnerCardTypeOptions: ["身份證", "護照"],
    otherOwnerCardNum: "證件號碼",
    otherOwnerAddress: "聯繫地址",

    isAccountManager: "本人是該帳戶之最初負責發出交易指示的人士。",
    otherManagerName: "姓名",
    otherManagerCardType: "證件類型",
    otherManagerCardTypeOptions: ["身份證", "護照"],
    otherManagerCardNum: "證件號碼",
    otherManagerAddress: "聯繫地址",

    // isNotOurStaff: `本人不是${customizeI18n.customize.company.securityFullName}及其聯繫公司的董事、雇員或持牌代表。`,
    // ourStaffJob: '職位',

    isNotOurStaffKin: `本人與${customizeI18n.customize.company.securityFullName}及其關聯公司之董事/員工無關。`,
    ourStaffKinName: "董事/員工",
    ourStaffKinRelation: "與本人關係",

    // isNotExchangeParter: '本人不是任何證券或期貨交易所的註冊人士或參與者，不受任何政府或監管機構所規管或監管。',
    // exchangeParterName: '監管機構名稱',
    // exchangeParterNation: '國家地區',

    isNotHkexParterStaff:
      "本人不是香港證券及期貨事務監察委員會的持牌或註冊人士，或任何持牌或註冊機構的董事、員工、代表或代理人。",
    hkexParterName: "姓名",
    hkexParterCENo: "中央編號",
    // hkexParterCompany: '公司名稱',
    // hkexParterStaffJob: '職位',

    isNotConsortWithMargin: `本人的配偶不是${customizeI18n.customize.company.securityFullName}的保證金客戶。`,
    withMarginName: "姓名",
    withMarginAccount: "賬號",

    isNotBOorPG: `本人及本人的配偶不是${customizeI18n.customize.company.securityFullName}其他保證金帳戶的實際擁有人或擔保人`,
    otherBOorPGAccountName: "帳戶名稱",
    otherBOorPGAccountNumber: "帳戶號碼",

    isNotConsortWithOtherMargin: `本人及本人的配偶沒有${customizeI18n.customize.company.securityFullName}任何保證金客戶中控制其百分之三十五或以上股權或表決權。`,
    withOtherMarginName: "姓名",
    withOtherMarginAccount: "賬號",
    usGreenCardCode: "美國納稅人識別號碼",
    // isNotCompanyController: '本人不是任何上市公司的董事、首席執行官或主要股東。',
    // companyControllerName: '公司/機構名稱',
    // companyControllerJob: '職位',
    // companyControllerExchange: '交易所/市場',
    // companyControllerCode: '股份代碼',
    isAccountOwnerAlert: `${customizeI18n.customize.company.securityName}暫不支持非本證券帳戶之最終實益擁有人提供線上開戶業務。`,
    isAccountManagerAlert: `${customizeI18n.customize.company.securityName}暫不支持非本證券帳戶之最初負責發出交易指示的人士提供線上開戶業務。`,
    // isNotOurStaffAlert: `${customizeI18n.customize.company.securityName}暫不支持本公司及其聯繫公司的董事、雇員或持牌代表提供線上開戶業務。`,
    isNotOurStaffKinAlert: `${customizeI18n.customize.company.securityName}暫不支持本公司及其聯繫公司之董事/員工的直系家庭成員提供線上開戶業務。`,
    // isNotExchangeParterAlert: `${customizeI18n.customize.company.securityName}暫不支持對證券或期貨交易所的註冊人士或參與者提供線上開戶業務。`,
    isNotHkexParterStaffAlert: `${customizeI18n.customize.company.securityName}暫不支持對香港證券及期貨事務監察委員會的持牌或註冊人士，或任何持牌或註冊機構的董事、員工、代表或代理人提供線上開戶業務。`,
    // isNotCompanyControllerAlert: `${customizeI18n.customize.company.securityName}暫不支持對上市公司的董事、首席執行官或主要股東提供線上開戶業務。`,
    isNotConsortWithMarginAlert: `${customizeI18n.customize.company.securityName}暫不支持對本公司保證金客戶之配偶提供線上開戶業務。`,
    isNotPOorBGAlert: `${customizeI18n.customize.company.securityName}暫不支持對本公司保證金客戶實際擁有人或者擔保人提供線上開戶業務。`,
    isNotConsortWithMarginOtherAlert: `${customizeI18n.customize.company.securityName}暫不支持對本公司保證金客戶中控制其百分之三十五或以上股權或表決權之人士及其配偶提供線上開戶業務。`,
    isNotUsGreenCardHolderAlert: `${customizeI18n.customize.company.securityName}暫不支持對美國居民或美國稅務居民提供線上開戶業務。`,
    inputPlaceholder: "請輸入",
    selectPlaceholder: "請選擇",
    add: "繼續添加",
    remove: "刪除上條",

    isNotUsGreenCardHolder: {
      title: "請選擇下列選項之一：",
      usGreenCardHoldStatusOptions: {
        greenCardHolder: "本人就課稅目的而言為美國公民或美國居民。",
        notAmericanBornInUS:
          "本人在美國出生但不再屬於美國公民，原因是本人自願放棄本人的公民身份，並以美國【喪失原有國籍證明】為憑證。",
        notGreenCardHolder: "本人就課稅目的而言不是美國公民或者美國居民。",
      },
    },
  },
  warn: {
    info: "請填寫正確格式的信息",
    lengthCommon: "此項最多填寫",
    lengthUnit: "條",
  },
};
