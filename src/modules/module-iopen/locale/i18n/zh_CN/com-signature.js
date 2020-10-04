import customizeI18n from '@/customize/locale/i18n/zh_CN';
import commonI18n from '@/main/locale/i18n/zh_CN';

export default {
    title:`我已阅读全部开户文件，了解相关风险并自愿在${customizeI18n.customize.company.securityName}开户。`,
    tips:'注意：竖向签名或签名潦草均不能通过审核',
    tipsContent:[
        '请按照下方图示',
        '【横向】',
        '手写个人',
        '【正楷】',
        ' 签名：'
    ],
    btnClear: '重签',
    btnConfirm: '确认签名',
    outAreaWarn: '签名超过虚线区域，可能导致开户审核失败',
};