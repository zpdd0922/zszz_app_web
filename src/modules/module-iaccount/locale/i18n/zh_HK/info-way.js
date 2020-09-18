import { FPS, EBANK, CHECK, EDDA } from "@/modules/module-iaccount/define";

export const DEPOSIT_WAY = {
  [EDDA]: {
    title: "快捷入金",
    value: EDDA,
    code: "4",
    symbol: "推薦",
    tips: true,
  },
  [FPS]: {
    title: "FPS轉數快",
    value: FPS,
    code: "1",
    symbol: "推薦",
    tips: true,
  },
  [EBANK]: {
    title: "E-banking網銀轉賬",
    value: EBANK,
    code: "2",
  },
  [CHECK]: {
    title: "支票轉賬",
    value: CHECK,
    code: "3",
  },
};

// eDDA入金
export const EDDA_INFO = {
  descTime: "最快5分鐘",
  descTimeTips:
    "港股交易時間段最快5分鐘入賬，非港股交易時間段將於下個港股交易日09:00前入賬。",
  descFee: "免費",
};

// 支票入金 - 收款银行
export const CHECK_INFO = {
  descTime: "1-2個工作日",
  descFee: "請咨詢銀行",
  accountName: "Well Link Securities",
  depositToAccount: {
    hkd: "012-123456789",
    usd: "012-123456789",
  },
  swiftCode: "BKCHHKHHXXX",
  depositToBankAddress:
    "Bank of China Tower, 1 Garden Road, Central, Hong Kong.",
};
