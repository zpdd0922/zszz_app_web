import customizeI18n from '@/customize/locale/i18n/zh_CN';
import commonI18n from '@/main/locale/i18n/zh_CN';

export default {
    title:`我已閱讀全部開戶文件，了解相關風險並自願在${customizeI18n.customize.company.securityName}開戶。`,
    tips:'注意：豎向簽名或簽名潦草均不能通過審核',
    tipsContent:[
        '請按照下方圖示',
        '【橫向】',
        '手寫個人',
        '【正楷】',
        ' 簽名：'
    ],
    btnClear: '重簽',
    btnConfirm: '確認簽名',
    outAreaWarn: '簽名超過虛線區域，可能導致開戶審核失敗',
};