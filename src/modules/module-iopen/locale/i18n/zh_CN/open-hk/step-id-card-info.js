import customizeI18n from '@/customize/locale/i18n/zh_CN';
import commonI18n from '@/main/locale/i18n/zh_CN';

export default {
    pageName: '基本信息',
    tips: '请确认您的身份信息，若有误请手动修改',
    placeholderMore: '(选填)',
    familyName: {
        label: '中文姓氏',
        placeholder: '请输入中文姓氏',
    },
    givenName: {
        label: '中文名字',
        placeholder: '请输入中文名字',
    },
    familyNameSpell: {
        label: '英文姓氏',
        placeholder: '请输入英文姓氏',
    },
    givenNameSpell: {
        label: '英文名字',
        placeholder: '请输入英文名字',
    },
    idCardValue: {
        label: '证件号码',
        placeholder: '请输入证件号码'
    },
    addressValue: {
        label: '证件地址',
        placeholder: '请输入身份证地址'
    },
    dateStartValue: {
        label: '有效期限',
        startPlaceholder: '起始日期',
        endPlaceholder: '结束日期',
        endForerver: '长期',
    },
    birthday: {
        label: '出生日期',
        placeholder: '请选择出生日期',
    },
    sex: {
        label: '性别',
        placeholder: '请选择性别',
    },
    authority: {
        label: '签发机关',
        placeholder: '请输入签发机关'
    },
    educationLevel: {
        label: '教育程度',
        placeholder: '请选择教育程度',
        options: {
            primary: '小学',
            secondary: '中学',
            diploma: '专上学院',
            universtyOrAbove: '大学或以上',
        }
    },
    maritalStatus: {
        label: '婚姻状况',
        placeholder: '请选择婚姻状况',
        options: {
            single: '未婚',
            married: '已婚',
            divorced: '离婚',
            widowed: '鳏寡',
        }
    }
}