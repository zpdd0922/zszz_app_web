import customizeI18n from '@/customize/locale/i18n/zh_CN';
import commonI18n from '@/main/locale/i18n/zh_CN';

export default {
  title: '引导页',
  contactPre: "如有疑问，请联系客服：",
  btnLogout:"退出登录",
  progress: {
    ready: '提交申请',
    approve: '资料审核',
    ca: 'CA认证',
    deposit: '身份认证',
    auth: '身份认证',
    open: '柜台开户'
  },
  ready: {
    ad: '足不出户，投资全球',
    tips: {
      title: '开户请准备',
      content: [
        '二代身份证',
        '银行借记卡',
        'WIFI网络',
      ]
    },
    desc: {
      title: '温馨提示',
      content: [
        '3分钟申请，7x24小时实时审批',
        // '云顿智能盯盘股市，随时获取股市变化情况',
      ]
    },
    btn: '立即开通',
  },
  pending: {
    doing: {
      title: '开户预批中',
      content: '您的资料已提交，正在为您进行开户预批'
    },
    approve: {
      title: '资料审核中',
      content: '您的申请已受理，正在核对您提交的资料'
    },
    
    open: {
      title: '柜台开户中',
      content: `您已成功身份认证，正在为您开立证券账户`
    },
    desc: {
      title: '温馨提示',
      cn: [
        '预计1-2个工作日预批，请留意短讯和邮件',
        '签署电子协议即开户成功，入金或转仓后可进行股票交易',
        '届时请及时修改交易密码',
      ],
      hk: [
        '预计1-2个工作日预批，请留意短讯和邮件',
        '账户审核通过后，通过开户本人同名银行账户首笔入金一万港币或以上即开户成功（不支持第三方和现金入金）',
        '届时请及时修改交易密码',
      ],
    },
    
  },
  authing:{
    ca_waiting: {
      title: '申请数字证书',
      btn: '同意申请数字证书',
      content: '您的资料已审核通过，请申请数字证书'
    },
    ca_doing: {
      title: 'CA认证中',
      content: '您的资料已审核通过，正在申请SZCA数字证书'
    },
    deposit_waiting: {
      title: '身份认证',
      btn: '已完成入金',
      content: '您的资料已审核通过，请入金完成身份认证'
    },
    deposit_doing: {
      title: '银行处理中',
      content: '您已经完成入金，等待银行处理中'
    },
    desc: {
      title: '温馨提示',
      cn: [
        '申请电子证书不产生任何费用',
        `该电子证书仅限于与${customizeI18n.customize.company.securityName}签署开户电子协定,并不应用于与任何其他协力厂商的电子认证或协定签署`,
      ],
      hk: [
        '请通过开户本人同名银行账户首笔入金一万港币或以上即完成身份认证（不支持第三方和现金入金）',
        `完成入金以后，请点击下方【已完成入金】通知${customizeI18n.customize.company.securityName}进行后续审核`,
      ],
    }
  },
  fail: {
    btn: '重新开户',
    titleBack: '资料被退回',
    titleCanceled: '您已取消开户',
    titleAccountOff: '您的账户已注销',
    titleAccountAbo: '您的账户异常',
    descTitle: '失败原因',
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
  }
}