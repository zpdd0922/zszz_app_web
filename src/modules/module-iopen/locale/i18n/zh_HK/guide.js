import customizeI18n from '@/customize/locale/i18n/zh_HK';
import commonI18n from '@/main/locale/i18n/zh_HK';

export default {
  title: '引導頁',
  contactPre: "如有疑問，請聯繫客服：",
  progress: {
    ready: '提交申請',
    approve: '資料審核',
    ca: 'CA認證',
    deposit: '身份認證',
    auth: '身份認證',
    open: '櫃枱開戶'
  },
  ready: {
    ad: '足不出戶，投資全球',
    tips: {
      title: '開戶請準備',
      content: [
        '二代身份證',
        '銀行借記卡',
        'WIFI網絡',
      ]
    },
    desc: {
      title: '溫馨提示',
      content: [
        '3分鐘申請，7x24小時實時審批',
        // '雲頓智能盯盤股市，隨時獲取股市變化情況',
      ]
    },
    btn: '立即開通',
  },
  pending: {
    doing: {
      title: '開戶預批中',
      content: '您的資料已提交，正在為您進行開戶預批'
    },
    approve: {
      title: '資料審核中',
      content: '您的申請已受理，正在核對您提交的資料'
    },
    
    open: {
      title: '櫃枱開戶中',
      content: `您已成功身份認證，正在為您開立證券賬戶`
    },
    desc: {
      title: '溫馨提示',
      cn: [
        '預計1-2個工作日預批，請留意短訊和郵件',
        '簽署電子協議即開戶成功，入金或轉倉後可進行股票交易',
        '屆時請及時修改交易密碼',
      ],
      hk: [
        '預計1-2個工作日預批，請留意短訊和郵件',
        '賬戶審核通過後，通過開戶本人同名銀行賬戶首筆入金一萬港幣或以上即開戶成功（不支持第三方和現金入金）',
        '屆時請及時修改交易密碼',
      ],
    },
    
  },
  authing:{
    ca_waiting: {
      title: '申請數字證書',
      btn: '同意申請數字證書',
      content: '您的資料已審核通過，請申請數字證書'
    },
    ca_doing: {
      title: 'CA認證中',
      content: '您的資料已審核通過，正在申請SZCA數字證書'
    },
    deposit_waiting: {
      title: '身份認證',
      btn: '已完成入金',
      content: '您的資料已審核通過，請入金完成身份認證'
    },
    deposit_doing: {
      title: '銀行處理中',
      content: '您已經完成入金，等待銀行處理中'
    },
    desc: {
      title: '溫馨提示',
      cn: [
        '申請電子證書不產生任何費用',
        `該電子證書僅限於與${customizeI18n.customize.company.securityName}簽署開戶電子協定,並不應用於與任何其他協力廠商的電子認證或協定簽署`,
      ],
      hk: [
        '請通過開戶本人同名銀行賬戶首筆入金一萬港幣或以上即完成身份認證（不支持第三方和現金入金）',
        `完成入金以後，請點擊下方【已完成入金】通知${customizeI18n.customize.company.securityName}進行後續審核`,
      ],
    }
  },
  fail: {
    btn: '重新開戶',
    titleBack: '資料被退回',
    titleCanceled: '您已取消開戶',
    titleAccountOff: '您的賬戶已註銷',
    titleAccountAbo: '您的賬戶異常',
    descTitle: '失敗原因',
  },
  success: {
    title: "開戶成功",
    desc: {
      tradeAccountPre: "交易賬號：",
      fundAccountPre: "資金賬號：",
      cn: [
        `你已成功簽署《${customizeI18n.customize.company.securityName}證券賬戶開立協議》並開立賬戶，`,
        '請在稍後的短訊和電郵中查收初始交易密碼，',
        '通過開戶本人同名銀行賬戶成功入金或轉倉成功即可進行股票交易。',
      ],
      hk: [
        `你已成功簽署《${customizeI18n.customize.company.securityName}證券賬戶開立協議》並開立資金賬戶，`,
        '通過開戶本人同名銀行賬戶首筆入金一萬港幣或以上即開戶成功，不支持第三方和現金入金。',
      ]
    }
  }
}