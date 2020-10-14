import customizeI18n from '@/customize/locale/i18n/zh_CN';
import commonI18n from '@/main/locale/i18n/zh_CN';

export default {
    pageName: '大陆银行卡验证身份',
    errorTips: '银行校验不通过，请注意个人姓名，身份证号码，银行卡号以及银行卡预留手机号四要素信息一致。',
    bankNum: {
        label: '银行卡号',
        placeholder: '请输入本人大陆储蓄卡号'
    },
    bankPhoneNum: {
        label: '银行预留手机',
        placeholder: '请输入储蓄卡预留手机号码'
    },
    bankCurrency: {
        label: '账户类型',
        placeholder: '请选择账户类型',
        options: {
            hkd: '港币账户',
            usd: '美元账户',
            rmb: '人民币账户',
            multiple: '综合账户（全部币种）',
        },
    },
    desc: {
        title: '温馨提示',
        content: [
            '请填写您的中国大陆银行储蓄卡信息。',
            '银行卡仅用于实名认证，与出入金、银行卡绑定等无关。'
        ]
    },
    errorTipsBankNum: '请输入正确的账户号码',
    errorPhoneNum: '请输入正确手机号码',
    warn: {
        bankNum: '请输入正确的银行卡号'
    }

}