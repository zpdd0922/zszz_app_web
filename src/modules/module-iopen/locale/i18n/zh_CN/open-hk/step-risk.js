import customizeI18n from '@/customize/locale/i18n/zh_CN';
import commonI18n from '@/main/locale/i18n/zh_CN';

export default {
    pageName: '风险披露',
    playMediaBtn: '开始播放风险披露露营',
    media: {
        repNameLabel: '持牌代表：',
        repCodeLabel: '中央编号：',
    },
    desc: {
        title: '温馨提示',
        content: [
            '1. 点击开始后，将播放风险披露录音并展示风险披露声明',
            '2. 如若环境不便，请戴耳机进行收听'
        ]
    },
    agreement: {
        linkStart: '本人已详细阅读并同意',
        linkContent: `《${customizeI18n.customize.company.securityName}客户协议书》`,
        linkEnd: '',
        dialogTitle: '客户协议书',
        dialogBtn: '已阅读并同意'
    },
};