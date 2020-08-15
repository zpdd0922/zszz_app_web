import customizeI18n from '@/customize/locale/i18n/zh_HK';
import commonI18n from '@/main/locale/i18n/zh_HK';

export default {
    pageName: '中國大陸身份證驗證',
    tips: '請確認您的身份信息，若有誤請手動修改',
    name: {
        label: '中文姓名',
        familyNameLabel: '姓',
        givenNameLabel: '名',
        familyNamePlaceholder: '請輸入中文姓',
        givenNamePlaceholder: '請輸入中文名',
    },
    nameSpell: {
        label: '姓名拼音',
        familyNameLabel: '姓',
        givenNameLabel: '名',
        familyNamePlaceholder: '請輸入拼音姓',
        givenNamePlaceholder: '請輸入拼音名',
    },
    nation: {
        label: '民族',
        placeholder: '請輸入民族'
    },
    idCardValue: {
        label: '身份證號',
        placeholder: '請輸入身份證號'
    },
    addressValue: {
        label: '證件地址',
        placeholder: '請輸入身份證地址'
    },
    dateStartValue: {
        label: '有效期限',
        startPlaceholder: '起始日期',
        endPlaceholder: '結束日期',
        endForerver: '長期',
        edfFoerverTips: '為確保您資料的準確性，請確認您的身份證是否為長期身份證！',
    },
    authority: {
        label: '簽發機關',
        placeholder: '請輸入簽發機關'
    },
}