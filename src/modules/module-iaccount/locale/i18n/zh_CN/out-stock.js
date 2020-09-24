export const outStock = {
  outWay: {
    title: "请选择转出股票",
    wayHK: "转出港股股票",
    wayUS: "转出美股股票",
  },
  transferInfo: {
    secName: "立桥证券",
    receiveInfo: {
      title: "接收方信息",
      receiveCompany: {
        placeholder: "请选择",
        label: "接收券商",
      },
      accountNumber: {
        placeholder: "接收券商的账户号码",
        label: "账户号码",
      },
      accountName: {
        placeholder: "接收券商的账户姓名",
        label: "账户姓名",
      },
      otherReceiveCompanyName: {
        placeholder: "接收券商的名称",
        label: "券商名称",
      },
      ccass: {
        placeholder: "中央结算编号",
        label: "CCASS号码",
      },
      rolloutContacts: {
        placeholder: "接收券商的联系人",
        label: "联系人",
      },
      contactsPhoneNum: {
        placeholder: "接收券商的联系人电话",
        label: "联系人电话",
      },
    },
    transferOutInfo: {
      title: "转出方信息",
      transferOutSec: {
        placeholder: "立桥证券",
        label: "转出账户",
      },
      transferOutAccount: {
        placeholder: "请选择",
        label: "转出账户",
      },
    },
    tips1: "账户姓名：需与立桥账户同名(",
    tips2: "),不允许使用第三方账户转出股票",
  },
  stockDetail: {
    title: "股票资讯",
    sharesCode: "股票",
    stockNamePlaceholder: "输入股票代码",
    sharesNum: "数量",
    quantityPlaceholder: "输入股票数量",
    noStockNameWarn: "股票代码不能为空",
    noQuantityWarn: "股票数量不能为空",
    repeatWarn: "股票代码不可重复输入",
    add: " 添加",
    delete: "删除",
    edit: "编辑",
    cancel: "取消",
    save: "保存",
    search: {
      searchInput: "请输入股票代码/名称/首字母",
      searchTitle: "以下为历史搜索记录",
      clear: "清除记录",
    },
    isSearching: "搜索中...",
    noResult: "无搜索结果",
  },
  infoConfirm: {
    confirmTitle: "请确认所填信息无误后提交",
    receive: {
      title: "接收方信息",
      companyName: "券商名称",
      accountNumber: "账户号码",
      accountName: "账户姓名",
    },
    transferOut: {
      title: "转出方信息",
      companyName: "券商名称",
      accountNumber: "转出账户",
    },
    stockInfo: {
      title: "股票信息",
      stockCode: "股票代码",
      stockName: "股票名称",
      quantity: "股票数量",
    },
    success: "提交成功",
    fail: "提交失败",
  },
};
