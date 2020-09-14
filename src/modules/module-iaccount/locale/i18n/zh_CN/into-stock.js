export const intoStock = {
    intoWay: {
      title: '请选择转入股票',
      wayHK: '转入港股股票',
      wayUS: '转入美股股票',
    },
    transferInfo: {
      transferOutInfo: {
        title: '转出方信息',
        transferOutCompany: {
          placeholder: '请选择',
          label: '转出券商',
        },
        accountNumber: {
          placeholder: '转出券商的账户号码',
          label: '账户号码',
        },
        accountName: {
          placeholder: '转出券商的账户姓名',
          label: '账户姓名',
        },
        otherTransferOutCompanyName: {
          placeholder: '转出券商的名称',
          label: '券商名称',
        },
        ccass: {
          placeholder: '中央结算编号',
          label: 'CCASS号码',
        },
         rolloutContacts: {
          placeholder: '转出券商的联系人',
          label: '联系人',
        },
        contactPhoneNum: {
          placeholder: '转出券商的联系人电话',
          label: '联系人电话',
        },
      },
      receiverInfo: {
        title: '接收方信息',
        receiveSec: {
          placeholder: '立桥证券',
          label: '接收账户',
        },
        receiveAccount: {
          placeholder: '请选择',
          label: '接收账户',
        },
      },
      tips1: '账户姓名：需与立桥账户同名(',
      tips2: '),不允许使用第三方账户转入股票',
    },
    stockDetail: {
      title: '股票资讯',
      sharesCode: '股票',
      stockNamePlaceholder: '输入股票代码',
      sharesNum: '数量',
      quantityPlaceholder: '输入股票数量',
      noStockNameWarn: '股票代码不能为空',
      noQuantityWarn: '股票数量不能为空',
      repeatWarn: '股票代码不可重复输入',
      search: {
        searchInput: '请输入股票代码/名称/首字母',
        searchTitle: '以下为历史搜索记录',
        clear: '清除记录',
      }
    },  
    infoConfirm: {
      confirmTitle: '请确认所填信息无误后提交',
      transferOut: {
        title: '转出方信息',
        companyName: '券商名称',
        accountNumber: '账户号码',
        accountName: '账户姓名',
      },
      receive: {
        title: '接收方信息',
        companyName: '券商名称',
        accountNumber: '接收账户',
      },
      stockInfo: {
        title: '股票信息',
        stockCode: '股票代码',
        stockName: '股票名称',
        quantity: '股票数量',
      }
    },  
}