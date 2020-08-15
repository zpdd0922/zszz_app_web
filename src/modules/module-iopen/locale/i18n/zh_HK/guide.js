import customizeI18n from '@/customize/locale/i18n/zh_HK';
import commonI18n from '@/main/locale/i18n/zh_HK';

export default {
  title: '引導頁',
  contactPre: "如有疑問，請聯繫客服：",
  progress: {
    ready: '提交申請',
    approve: '資料審核',
    ca: 'CA認證',
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
        '雲頓智能盯盤股市，隨時獲取股市變化情況',
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
    ca: {
      title: 'CA認證中',
      content: '您的資料已審核通過，正在申請SZCA數字證書'
    },
    open: {
      title: '櫃枱開戶中',
      content: `您已成功簽署數字證書，正在為您開立證券賬戶`
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