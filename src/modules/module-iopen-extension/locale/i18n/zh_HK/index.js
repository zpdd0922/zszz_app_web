import customizeI18n from "@/customize/locale/i18n/zh_CN";
import commonI18n from "@/main/locale/i18n/zh_CN";

import main from "./main";

export default {
  iopenExt: {
    main,
    nextBtn: "下一步",
    guide: {
      contactPre: "如有疑問，請聯繫客服：",
      ready: {
        ad: "足不出戶，投資全球",
        tips: {
          title: "開戶請準備",
          content: ["二代身份證", "銀行借記卡", "WIFI網路"],
        },
        desc: {
          title: "溫馨提示",
          content: [
            "3分鐘申請，7x24小時即時審批",
            // '雲頓智能盯盤股市，隨時獲取股市變化情況',
          ],
        },
        btn: "立即開通保證金帳戶",
      },
      pending: {
        doing: {
          title: "開戶審批中",
          content: "您的資料已提交，正在為您進行開戶審批",
        },
        approve: {
          title: "資料審核中",
          content: "您的申請已受理，正在核對您提交的資料",
        },

        open: {
          title: "櫃檯開戶中",
          content: `您已成功身份認證，正在為您開立證券帳戶`,
        },
        desc: {
          title: "溫馨提示",
          cn: [
            "預計1-2個工作日預批，請留意短訊和郵件",
            "簽署電子協議即開戶成功，入金或轉倉後可進行股票交易",
            "屆時請及時修改交易密碼",
          ],
          hk: [
            "預計1-2個工作日預批，請留意短訊和郵件",
            "帳戶審核通過後，通過開戶本人同名銀行帳戶首筆入金一萬港幣或以上即開戶成功（不支持第三方和現金入金）",
            "屆時請及時修改交易密碼",
          ],
        },
      },
      success: {
        title: "開戶成功",
        desc: {
          tradeAccountPre: "交易賬號：",
          fundAccountPre: "資金賬號：",
          cn: [
            `你已成功簽署《${customizeI18n.customize.company.securityName}證券帳戶開立協議》並開立帳戶，`,
            "請在稍後的短訊和電郵中查收初始交易密碼，",
            "通過開戶本人同名銀行帳戶成功入金或轉倉成功即可進行股票交易。",
          ],
          hk: [
            `你已成功簽署《${customizeI18n.customize.company.securityName}證券帳戶開立協議》並開立資金帳戶，`,
            "通過開戶本人同名銀行帳戶首筆入金一萬港幣或以上即開戶成功，不支持第三方和現金入金。",
          ],
        },
      },
      fail: {
        btn: "重新開戶",
        titleBack: "開戶失敗",
        titleCanceled: "您已取消開戶",
        titleAccountOff: "您的帳戶已註銷",
        titleAccountAbo: "您的帳戶異常",
        descTitle: "失敗原因",
      },
    },
    openMargin: {
      isNotConsortWithMargin: `本人的配偶不是${customizeI18n.customize.company.securityFullName}的保證金客戶。`,
      withMarginName: "姓名",
      withMarginAccount: "賬號",

      isNotBOorPG: `本人及本人的配偶不是${customizeI18n.customize.company.securityFullName}其他保證金帳戶的實際擁有人或擔保人`,
      otherBOorPGAccountName: "帳戶名稱",
      otherBOorPGAccountNumber: "帳戶號碼",

      isNotConsortWithOtherMargin: `本人及本人的配偶沒有${customizeI18n.customize.company.securityFullName}任何保證金客戶中控制其百分之三十五或以上股權或表決權。`,
      withOtherMarginName: "姓名",
      withOtherMarginAccount: "賬號",

      adjectiveAuth: `當升級為保證金（融資）帳戶後，${customizeI18n.customize.company.securityFullName}有權隨時運用本人的保證金（融資）帳戶內之證券，可進行抵押或其他處置。本人明白常設授權續期通知書將於常設授權屆滿前最少十四（14）天寄予本人。如${customizeI18n.customize.company.securityFullName}於常設授權有效期屆滿前未有接獲本人等書面反對，則本人之常設授權會在屆滿時按照常設授權的條款及細則視作為同意續期十二（12）個月。`,

      inputPlaceholder: "請輸入",

      declareTitle: "客戶聲明",

      isNotConsortWithMarginAlert: `${customizeI18n.customize.company.securityName}暫不支持對本公司保證金客戶之配偶提供線上開戶業務。`,
      isNotBOorPGAlert: `${customizeI18n.customize.company.securityName}暫不支持對本公司保證金客戶實際擁有人或者擔保人提供線上開戶業務。`,
      isNotConsortWithOtherMarginAlert: `${customizeI18n.customize.company.securityName}暫不支持對本公司保證金客戶中控制其百分之三十五或以上股權或表決權之人士及其配偶提供線上開戶業務。`,
      adjectiveAuthAlert: `${customizeI18n.customize.company.securityName}要求簽署常設授權協議。`,
    },
    risk: {
      title: "風險披露",
      playMediaBtn: "開始播放風險披露錄音",
      media: {
        repNameLabel: "持牌代表：",
        repCodeLabel: "中央編號：",
      },
      desc: {
        title: "溫馨提示",
        content: [
          "1. 點擊開始後，將播放風險披露錄音並展示風險披露聲明",
          "2. 如若環境不便，請戴耳機進行收聽",
        ],
      },
      agreement: {
        linkStart: "本人已詳細閱讀並同意上述聲明",
        linkContent: `《${customizeI18n.customize.company.securityName}客戶協議書》`,
        linkEnd: "",
        dialogTitle: "客戶協議書",
        dialogBtn: "已閱讀並同意",
      },
    },
    confirm: {
      title: "開戶檔確認",
      customerAgreement: "保證金（融資）客戶協議書（證券交易帳戶）",
      riskAgreement: "風險披露聲明書--保證金（融資）帳戶",
      adjectiveAuthAgreement: "證券及期貨（客戶證券）規定的常設授權",
      feeAgreement: "立橋證券收費表",
      nextBtn: "確認提交",
      tradePwd: {
        label: "交易密碼",
        placeholder: "請輸入交易密碼",
        badPwd: '密碼格式不正確',
      },
      agreement: {
        linkStart: "",
        linkContent: `已閱讀並接受全部檔內容`,
        linkEnd: "",
      },
      submitSuccess: '提交成功',
      submitFailed: '提交失敗',
    },
    common: {
      nextBtn: "下一步",
    },
    comSignature: {
      title: `我已閱讀全部開戶檔，瞭解相關風險並自願在${customizeI18n.customize.company.securityName}開戶。`,
      tips: "注意：豎向簽名或簽名潦草均不能通過審核",
      tipsContent: [
        "請按照下方圖示",
        "【橫向】",
        "手寫個人",
        "【正楷】",
        " 簽名：",
      ],
      btnClear: "重簽",
      btnConfirm: "確認簽名",
    },
  },
};
