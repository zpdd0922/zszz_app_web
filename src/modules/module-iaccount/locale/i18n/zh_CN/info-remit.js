export const BANK_NAME_OPTIONS = [
  {
    value: 'BOCHK',
    text: '中国银行(香港)',
    getBankCode: 'BOCHK',
    getBankNameCn: '中国银行(香港)',
    getBankNameEn: 'BANK OF CHINA (HONG KONG) LIMITED',
    getBankAddress: 'Bank of China Tower, 1 Garden Road, Central, Hong Kong',
    swiftCode: 'BKCHHKHHXXX',
    depositToAccount: {
      hkd: '01288400127638',
      usd: '01288408017580'
    },
    getAccountName: '9F Primasia Securities Limited'
  },
  {
    value: 'HSBCHK',
    text: '汇丰银行',
    getBankCode: 'HSBCHK',
    getBankNameCn: '汇丰银行',
    getBankNameEn: 'HONGKONG AND SHANGHAI BANKING CORPORATION LIMITED',
    getBankAddress: '1, Queen\'s Road Central, Hong Kong',
    swiftCode: 'HSBCHKHHHKH',
    depositToAccount: {
      hkd: '600325351292',
      usd: '600325351274'
    },
    getAccountName: '9F Primasia Securities Limited'
  },
  {
    value: 'DBS',
    text: '星展银行',
    getBankCode: 'DBS',
    getBankNameCn: '星展银行',
    getBankNameEn: 'DBS BANK (HONG KONG) LIMITED',
    getBankAddress: 'MILLENNIUM CITY 6 FLOOR 9 392 KWUN TONG ROAD',
    swiftCode: 'DHBKHKHHXXX 或 DHBKHKHH',
    depositToAccount: {
      hkd: '000292053',
      usd: '000292053'
    },
    getAccountName: '9F Primasia Securities Limited'
  }
]