import customizeI18n from "@/customize/locale/i18n/zh_CN";
import commonI18n from "@/main/locale/i18n/zh_CN";

import main from "./main";

export default {
  iopenExt: {
    main,
    nextBtn: "下一步",
    guide: {
      contactPre: "如有疑问，请联系客服：",
      ready: {
        ad: "足不出户，投资全球",
        tips: {
          title: "开户请准备",
          content: ["二代身份证", "银行借记卡", "WIFI网络"],
        },
        desc: {
          title: "温馨提示",
          content: [
            "3分钟申请，7x24小时实时审批",
            // '云顿智能盯盘股市，随时获取股市变化情况',
          ],
        },
        btn: "立即开通保证金账户",
      },
      pending: {
        doing: {
          title: "开户审批中",
          content: "您的资料已提交，正在为您进行开户审批",
        },
        approve: {
          title: "资料审核中",
          content: "您的申请已受理，正在核对您提交的资料",
        },

        open: {
          title: "柜台开户中",
          content: `您已成功身份认证，正在为您开立证券账户`,
        },
        desc: {
          title: "温馨提示",
          cn: [
            "预计1-2个工作日预批，请留意短讯和邮件",
            "签署电子协议即开户成功，入金或转仓后可进行股票交易",
            "届时请及时修改交易密码",
          ],
          hk: [
            "预计1-2个工作日预批，请留意短讯和邮件",
            "账户审核通过后，通过开户本人同名银行账户首笔入金一万港币或以上即开户成功（不支持第三方和现金入金）",
            "届时请及时修改交易密码",
          ],
        },
      },
      success: {
        title: "开户成功",
        desc: {
          tradeAccountPre: "交易账号：",
          fundAccountPre: "资金账号：",
          cn: [
            `你已成功签署《${customizeI18n.customize.company.securityName}证券账户开立协议》并开立账户，`,
            '请在稍后的短讯和电邮中查收初始交易密码，',
            '通过开户本人同名银行账户成功入金或转仓成功即可进行股票交易。',
          ],
          hk: [
            `你已成功签署《${customizeI18n.customize.company.securityName}证券账户开立协议》并开立资金账户，`,
            '通过开户本人同名银行账户首笔入金一万港币或以上即开户成功，不支持第三方和现金入金。',
          ]
        }
      },
      fail: {
        btn: '重新开户',
        titleBack: '开户失败',
        titleCanceled: '您已取消开户',
        titleAccountOff: '您的账户已注销',
        titleAccountAbo: '您的账户异常',
        descTitle: '失败原因',
      },
    
    },
    openMargin: {
      isNotConsortWithMargin: `本人的配偶不是${customizeI18n.customize.company.securityFullName}的保证金客户。`,
      withMarginName: "姓名",
      withMarginAccount: "账号",

      isNotBOorPG: `本人及本人的配偶不是${customizeI18n.customize.company.securityFullName}其他保证金账户的实际拥有人或担保人`,
      otherBOorPGAccountName: "账户名称",
      otherBOorPGAccountNumber: "账户号码",

      isNotConsortWithOtherMargin: `本人及本人的配偶没有${customizeI18n.customize.company.securityFullName}任何保证金客户中控制其百分之三十五或以上股权或表决权。`,
      withOtherMarginName: "姓名",
      withOtherMarginAccount: "账号",

      adjectiveAuth: `当升级为保证金（融资）账户后，${customizeI18n.customize.company.securityFullName}有权随时运用本人的保证金（融资）账户内之证券，可进行抵押或其他处置。本人明白常设授权续期通知书将于常设授权届满前最少十四（14）天寄予本人。如${customizeI18n.customize.company.securityFullName}于常设授权有效期届满前未有接获本人等书面反对，则本人之常设授权会在届满时按照常设授权的条款及细则视作为同意续期十二（12）个月。`,

      inputPlaceholder: "请输入",

      declareTitle: "客户声明",

      isNotConsortWithMarginAlert: `${customizeI18n.customize.company.securityName}暂不支持对本公司保证金客户之配偶提供线上开户业务。`,
      isNotBOorPGAlert: `${customizeI18n.customize.company.securityName}暂不支持对本公司保证金客户实际拥有人或者担保人提供线上开户业务。`,
      isNotConsortWithOtherMarginAlert: `${customizeI18n.customize.company.securityName}暂不支持对本公司保证金客户中控制其百分之三十五或以上股权或表决权之人士及其配偶提供线上开户业务。`,
      adjectiveAuthAlert: `${customizeI18n.customize.company.securityName}要求签署常设授权协议。`,
    },
    risk: {
      title: "风险披露",
      playMediaBtn: "开始播放风险披露录音",
      media: {
        repNameLabel: "持牌代表：",
        repCodeLabel: "中央编号：",
      },
      desc: {
        title: "温馨提示",
        content: [
          "1. 点击开始后，将播放风险披露录音并展示风险披露声明",
          "2. 如若环境不便，请戴耳机进行收听",
        ],
      },
      agreement: {
        linkStart: "本人已详细阅读并同意上述声明",
        linkContent: `《${customizeI18n.customize.company.securityName}客户协议书》`,
        linkEnd: "",
        dialogTitle: "客户协议书",
        dialogBtn: "已阅读并同意",
      },
    },
    confirm: {
      title: "开户文件确认",
      customerAgreement: "保证金（融资）客户协议书（证券交易账户）",
      riskAgreement: "风险披露声明书--保证金（融资）账户",
      adjectiveAuthAgreement: "证券及期货（客户证券）规定的常设授权",
      feeAgreement: "立桥证券收费表",
      nextBtn: "确认提交",
      tradePwd: {
        label: "交易密码",
        placeholder: "请输入交易密码",
      },
      agreement: {
        linkStart: "",
        linkContent: `已阅读并接受全部文件内容`,
        linkEnd: "",
      },
    },
    common: {
      nextBtn: "下一步",
    },
    comSignature: {
      title: `我已阅读全部开户文件，了解相关风险并自愿在${customizeI18n.customize.company.securityName}开户。`,
      tips: "注意：竖向签名或签名潦草均不能通过审核",
      tipsContent: [
        "请按照下方图示",
        "【横向】",
        "手写个人",
        "【正楷】",
        " 签名：",
      ],
      btnClear: "重签",
      btnConfirm: "确认签名",
    },
  },
};
