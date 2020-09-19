import customizeI18n from '@/customize/locale/i18n/zh_HK';
import commonI18n from '@/main/locale/i18n/zh_HK';

export default {
    pageName: '大陸銀行卡驗證身份',
    errorTips: '銀行校驗不通過，請注意個人姓名，手機號碼，銀行卡號以及銀行卡預留手機號四要素信息一致。',
    bankNum: {
        label: '銀行卡號',
        placeholder: '請輸入本人大陸儲蓄卡號'
    },
    bankPhoneNum: {
        label: '銀行預留手機',
        placeholder: '請輸入儲蓄卡預留手機號碼'
    },
    bankCurrency: {
        label: '賬戶類型',
        placeholder: '請選擇賬戶類型',
        options: {
            hkd: '港幣賬戶',
            usd: '美元賬戶',
            rmb: '人民幣賬戶',
            multiple: '綜合賬戶（全部幣種）',
        },
    },
    desc: {
        title: '溫馨提示',
        content: [
            '請填寫您的中國大陸銀行儲蓄卡信息。',
            '銀行卡僅用於實名認證，與出入金、銀行卡綁定等無關。'
        ]
    },
    errorTipsBankNum: '請輸入正確的帳戶號碼',  
}