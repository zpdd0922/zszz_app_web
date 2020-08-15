import customizeI18n from '@/customize/locale/i18n/zh_HK';
import commonI18n from '@/main/locale/i18n/zh_HK';

export default {
    pageName: '綁定同名香港銀行賬戶',
    tips: '請綁定您同名$userName$的香港銀行賬戶，',
    tips2: '不接受綁定他人或聯名銀行賬戶',
    imgTips: '請上傳包含賬號的香港銀行卡或電子截圖',
    bankId: {
        label: '銀行',
        placeholder: '請選擇香港銀行',
        options: {
            HSBCHK: '滙豐銀行',
            SCHK: '渣打銀行',
            HSHK: '恒生銀行',
            CMBWLB: '招商永隆銀行',
            BOCHK: '中國銀行（香港）',
            ICBCASIA: '中國工商銀行（亞洲）',
            CMBHK: '招商銀行香港分行',
            CMBCHK: '民生銀行香港分行',
            OTHERS: '其他香港銀行',
        }
    },
    otherBankName: {
        label: '銀行名稱',
        placeholder: '請輸入銀行名稱'
    },
    bankNum: {
        label: '賬戶號碼',
        placeholder: '請輸入賬戶號碼'
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
            '開戶成功後，只能透過此綁定銀行賬戶進行存款與提款',
        ]
    },
}