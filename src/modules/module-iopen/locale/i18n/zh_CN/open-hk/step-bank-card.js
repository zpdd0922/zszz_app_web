import customizeI18n from '@/customize/locale/i18n/zh_CN';
import commonI18n from '@/main/locale/i18n/zh_CN';

export default {
    pageName: '绑定同名香港银行账户',
    tips: '请绑定您同名$userName$的香港银行账户，',
    tips2: '不接受绑定他人或联名银行账户',
    imgTips: '请上传包含账号的香港银行卡或电子截图',
    bankId: {
        label: '银行',
        placeholder: '请选择香港银行',
        options: {
            HSBCHK: '汇丰银行',
            SCHK: '渣打银行',
            HSHK: '恒生银行',
            CMBWLB: '招商永隆银行',
            BOCHK: '中国银行（香港）',
            ICBCASIA: '中国工商银行（亚洲）',
            CMBHK: '招商银行香港分行',
            CMBCHK: '民生银行香港分行',
            OTHERS: '其他香港银行',
        }
    },
    otherBankName: {
        label: '银行名称',
        placeholder: '请输入银行名称'
    },
    bankNum: {
        label: '账户号码',
        placeholder: '请输入账户号码'
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
            '开户成功后，只能透过此绑定银行账户进行存款与提款',
        ]
    },
}