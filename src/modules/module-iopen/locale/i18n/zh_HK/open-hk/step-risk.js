import customizeI18n from '@/customize/locale/i18n/zh_HK';
import commonI18n from '@/main/locale/i18n/zh_HK';

export default {
    pageName: '風險披露',
    playMediaBtn: '開始播放風險披露露營',
    media: {
        repNameLabel: '持牌代表：',
        repCodeLabel: '中央編號：',
    },
    desc: {
        title: '溫馨提示',
        content: [
            '1. 點擊開始後，將播放風險披露錄音並展示風險披露聲明',
            '2. 如若環境不便，請戴耳機進行收聽'
        ]
    },
    agreement: {
        linkStart: '本人已詳細閱讀並同意',
        linkContent: `《${customizeI18n.customize.company.securityName}客戶協議書》`,
        linkEnd: '',
        dialogTitle: '客戶協議書',
        dialogBtn: '已閱讀並同意'
    },
};