import customizeI18n from "@/customize/locale/i18n/zh_CN";
import commonI18n from "@/main/locale/i18n/zh_CN";

import main from "./main";

export default {
  doubleCheck: {
    main,
    header_1: "由于您是首次在此设备进行登录",
    header_2: "为保障您的账户安全，需要二次短信身份认证。",
    tips: "信任此设备，7天内没在此设备登录，再通知我",
    confirmBtn: "确认",
    captchaPlaceholder: '请输入验证码',
    sendCaptcha: '获取验证码',
    faqs: {
      question_1: "什么是双重身份认证？",
      answer_1:
        "双重身份认证（简称 2FA）是香港证监会于 2017 年 10 月 27 日的发文《降低及纾减与互联网交易相关的黑客入侵风险指引》中，为保障客户账户资产安全，提出除账户密码外的二次身份认证方案。",
      question_2: "是否每次登录都需要双重身份认证？",
      answer_2:
        "您可以选择信任此设备。当您在受信设备上登录时无需再做双重身份认证。当连续 7 日内未在受信设备上进行登录时，信任关系将被解除。",
      question_3: "短信验证码收不到怎么办？",
      answer_3:
        "短信验证码发送有一定延迟，如您在 30 秒内还未收到短信验证码，请联系在线客服：+852 3150 7728。如您在开户资料中预留的手机号码已不再使用，需填写《更改账户资料格》寄送给我们，以更新您的帐户资料。详情请咨询客服。",
    },
  },
};
