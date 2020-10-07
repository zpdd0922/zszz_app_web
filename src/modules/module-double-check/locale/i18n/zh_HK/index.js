import customizeI18n from "@/customize/locale/i18n/zh_CN";
import commonI18n from "@/main/locale/i18n/zh_CN";

import main from "./main";

export default {
  doubleCheck: {
    main,
    header_1: "由於您是首次在此設備進行登錄",
    header_2: "為保障您的帳戶安全，需要二次短信身份認證。",
    tips: "信任此設備，7天內沒在此設備登錄，再通知我",
    confirmBtn: "確認",
    captchaPlaceholder: "請輸入驗證碼",
    sendCaptcha: "獲取驗證碼",
    faqs: {
      question_1: "什麼是雙重身份認證？",
      answer_1:
        "雙重身份認證（簡稱 2FA）是香港證監會於 2017 年 10 月 27 日的發文《降低及紓減與互聯網交易相關的駭客入侵風險指引》中，為保障客戶帳戶資產安全，提出除帳戶密碼外的二次身份認證方案。",
      question_2: "是否每次登錄都需要雙重身份認證？",
      answer_2:
        "您可以選擇信任此設備。當您在受信設備上登錄時無需再做雙重身份認證。當連續 7 日內未在受信設備上進行登錄時，信任關係將被解除。",
      question_3: "短信驗證碼收不到怎麼辦？",
      answer_3:
        "短信驗證碼發送有一定延遲，如您在 30 秒內還未收到短信驗證碼，請聯繫線上客服：+852 3150 7728。如您在開戶資料中預留的手機號碼已不再使用，需填寫《更改帳戶資料格》寄送給我們，以更新您的帳戶資料。詳情請諮詢客服。",
    },
    statusWarnList: {
      firstTime: {
        header1: "由於您是首次在此設備進行登錄",
        header2: "為保障您的帳戶安全，需要二次短信身份認證。",
      },
      mt7days: {
        header1: "由於您在 7 天內沒有在此設備進行登錄",
        header2: "為保障您的帳戶安全，需要再次進行二次短信身份認證。",
      },
      untrust: {
        header1: "您登錄的設備不在信任設備清單中",
        header2: "為保障您的帳戶安全，需要二次短信身份認證。",
      },
    },
    checkSuccess: "綁定成功！",
    getCaptcha: "請獲取驗證碼",
    captchaWarn: '請輸入驗證碼',
    curPhoneNum: '您當前的電話號碼為：'

  },
};
