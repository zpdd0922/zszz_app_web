import customizeI18n from '@/customize/locale/i18n/zh_CN';

export const addLimit = {
  pageName: "信用额度提升",
  loanLimit: {
    nextTitle: "当前只能调整为",
    cn: {
      currentName: "A股通当前信用额度",
      accountName: "A股通",
      nextName: "A股账户",
      curreny: 'CNY'
    },
    hk: {
      currentName: "港股当前信用额度",
      accountName: "港股",
      nextName: "港股账户",
      curreny: 'HKD'
    },
    us: {
      currentName: "美股当前信用额度",
      accountName: "美股",
      nextName: "美股账户",
      curreny: 'USD'
    }
  },

  loanLimitCurrent: {
    cn: {
      title: "A股通当前信用额度",
      curreny: 'CNY'
    },
    hk: {
      title: "港股当前信用额度",
      curreny: 'HKD'
    },
    us: {
      title: "美股当前信用额度",
      curreny: 'USD'
    }
  },
  loanLimitNext: {
    cn: {
      title: "港股账户",
      curreny: 'CNY'
    },
    hk: {
      title: "港股当前信用额度",
      curreny: 'HKD'
    },
    us: {
      title: "美股当前信用额度",
      curreny: 'USD'
    }
  },

  canLimit: {
    title: "当前只能调整为",
    hk: "港股账户",
  },
  tradePwd: {
    label: "交易密码",
    placeholder: "请输入交易密码",
  },
  agree: "我已认真阅读，理解并同意接受",
  confirm: "立即申请",
  tips: {
    title: '温馨提示',
  },
  agreement: {
    linkStart: "本人已详细阅读并同意接受",
    linkContent: `《风险披露》`,
    linkEnd: "",
  },
  nextBtn: '立即申请',
  record: '调额记录',
  tipsList: [
    '1) 融资账户使用融资功能需申请信用额度;',
    '2) 你可根据需求选择申请相应的信用额度，最大可申请额度是港股账户总持仓的可用股票抵押额的2倍;',
    '3) 信用额度申请后，可以根据需求及持仓状况再次申请调整;',
    '4) 信用额度表示您信用规模的上限，交易时实际购买力取决于账户股票抵押额和信用额度的较小者;',
    '5) 审批信用额度时间约为1-2个工作日，审批结果将通过短信、邮件等通知，敬请留意。如有疑问，可联系客服+852 3150 7728;',
  ],
  history: {
    status: {
      unProcessed: '待处理',
      processing: '处理中',
      success: '已成功',
      backed: '已退回',
    },
    pageName: '调整额度历史',
    mktTitle: '账户',
    mktHK: '港股',
    originLimitTitle: '原有额度',
    curLimitTitle: '获取额度',
    noMore: '无更多记录',
    
  },
  warn: {
    badPwd: '密码格式不正确',
    submitSuccess: '提交成功',
  }
};
