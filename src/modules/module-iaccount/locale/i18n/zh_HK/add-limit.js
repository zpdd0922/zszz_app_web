import customizeI18n from "@/customize/locale/i18n/zh_CN";

export const addLimit = {
  pageName: "信用額度提升",
  curLimit: {
    titleHK: "港股當前信用額度",
    unit: "HKD",
  },
  canLimit: {
    title: "當前只能調整為",
    hk: "港股帳戶",
  },
  tradePwd: {
    label: "交易密碼",
    placeholder: "請輸入交易密碼",
  },
  agree: "我已認真閱讀，理解並同意接受",
  confirm: "立即申請",
  tips: {
    title: "溫馨提示",
  },
  agreement: {
    linkStart: "本人已詳細閱讀並同意接受",
    linkContent: `《風險披露》`,
    linkEnd: "",
  },
  nextBtn: "立即申請",
  record: "調整記錄",
  tipsList: [
    "1) 融資帳戶使用融資功能需申請信用額度;",
    "2) 你可根據需求選擇申請相應的信用額度，最大可申請額度是港股帳戶總持倉的可用股票抵押額的2倍;",
    "3) 信用額度申請後，可以根據需求及持倉狀況再次申請調整;",
    "4) 信用額度表示您信用規模的上限，交易時實際購買力取決於帳戶股票抵押額和信用額度的較小者;",
    "5) 審批信用額度時間約為1-2個工作日，審批結果將通過短信、郵件等通知，敬請留意。如有疑問，可聯繫客服+852 3150 7728;",
  ],
  history: {
    status: {
      unProcessed: "未處理",
      processing: "處理中",
      success: "已成功",
      backed: "已退回",
    },
    pageName: "調整額度歷史",
    mktTitle: "帳戶",
    mktHK: "港股",
    originLimitTitle: "原有額度",
    curLimitTitle: "現有額度",
    noMore: "無更多記錄",
  },
};
