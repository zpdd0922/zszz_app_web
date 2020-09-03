import customizeI18n from '@/customize/locale/i18n/zh_HK';
import commonI18n from '@/main/locale/i18n/zh_HK';

export default {
    pageName: '開戶準備',
    content: [
        { icon: 'id-card', label: '港澳通行證/護照/身份證' },
        { icon: 'bank-card', label: '香港銀行卡' },
        { icon: 'wifi', label: 'WIFI網絡' },
    ],
    btn:'開始填寫資料',
    agreement: {
        linkStart: '本人已詳細閱讀並同意',
        linkContent: `《${customizeI18n.customize.company.securityName}客戶協議書》`,
        linkEnd: '',
        dialogTitle: '客戶協議書',
        dialogBtn: '已閱讀並同意'
    },
};