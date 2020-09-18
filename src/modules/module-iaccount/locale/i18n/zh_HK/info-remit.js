export const BANK_NAME_OPTIONS = [
  {
    value: "BOCHK",
    text: "中國銀行（香港）",
    getBankCode: "BOCHK",
    getBankNameCn: "中国银行(香港)",
    getBankNameEn: "BANK OF CHINA (HONG KONG) LIMITED",
    getBankAddress: "Bank of China Tower, 1 Garden Road, Central, Hong Kong",
    swiftCode: "BKCHHKHHXXX",
    depositToAccount: {
      hkd: "012123456789",
      usd: "012123456789",
    },
    getAccountName: "Well Link Securities",
  },
  {
    value: "HSBCHK",
    text: "滙豐銀行",
    getBankCode: "HSBCHK",
    getBankNameCn: "汇丰银行",
    getBankNameEn: "HONGKONG AND SHANGHAI BANKING CORPORATION LIMITED",
    getBankAddress: "1, Queen's Road Central, Hong Kong",
    swiftCode: "HSBCHKHHHKH",
    depositToAccount: {
      hkd: "600123456789",
      usd: "600123456789",
    },
    getAccountName: "Well Link Securities",
  },
  {
    value: "DBS",
    text: "星展銀行",
    getBankCode: "DBS",
    getBankNameCn: "星展银行",
    getBankNameEn: "DBS BANK (HONG KONG) LIMITED",
    getBankAddress: "MILLENNIUM CITY 6 FLOOR 9 392 KWUN TONG ROAD",
    swiftCode: "DHBKHKHHXXX 或 DHBKHKHH",
    depositToAccount: {
      hkd: "000123456",
      usd: "000123456",
    },
    getAccountName: "Well Link Securities",
  },
];
