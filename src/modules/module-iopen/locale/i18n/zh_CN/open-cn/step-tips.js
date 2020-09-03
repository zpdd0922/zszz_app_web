import customizeI18n from '@/customize/locale/i18n/zh_CN';
import commonI18n from '@/main/locale/i18n/zh_CN';

export default {
    pageName: '开户准备',
    content: [
        { icon: 'id-card', label: '中国大陆身份证' },
        { icon: 'bank-card', label: '中国大陆银行借记卡' },
        { icon: 'wifi', label: 'WIFI网络' },
    ],
    btn:'开始填写资料',
    agreement: {
        linkStart: '本人已详细阅读并同意',
        linkContent: `《${customizeI18n.customize.company.securityName}客户协议书》`,
        linkEnd: '',
        dialogTitle: '客户协议书',
        dialogBtn: '已阅读并同意'
    },
};