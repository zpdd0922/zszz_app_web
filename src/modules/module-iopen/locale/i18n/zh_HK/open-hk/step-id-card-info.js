import customizeI18n from '@/customize/locale/i18n/zh_HK';
import commonI18n from '@/main/locale/i18n/zh_HK';

export default {
    pageName: '基本資訊',
    tips: '請確認您的身份信息，若有誤請手動修改',
    placeholderMore: '(選填)',
    familyName: {
        label: '中文姓氏',
        placeholder: '請輸入中文姓氏',
    },
    givenName: {
        label: '中文名字',
        placeholder: '請輸入中文名字',
    },
    familyNameSpell: {
        label: '英文姓氏',
        placeholder: '請輸入姓氏拼音',
        placeholder2: '請輸入英文姓氏',
    },
    givenNameSpell: {
        label: '英文名字',
        placeholder: '請輸入名字拼音',
        placeholder2: '請輸入英文名字',
    },
    idCardValue: {
        label: '證件號碼',
        placeholder: '請輸入證件號碼'
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
    },
    birthday: {
        label: '出生日期',
        placeholder: '請選擇出生日期',
    },
    sex: {
        label: '性別',
        placeholder: '請選擇性別',
    },
    authority: {
        label: '簽發機關',
        placeholder: '請輸入簽發機關'
    },
    educationLevel: {
        label: '教育程度',
        placeholder: '請選擇教育程度',
        options: {
            primary: '小學',
            secondary: '中學',
            diploma: '專上學院',
            universtyOrAbove: '大學或以上',
        }
    },
    maritalStatus: {
        label: '婚姻状况',
        placeholder: '請選擇婚姻狀況',
        options: {
            single: '未婚',
            married: '已婚',
            divorced: '離婚',
            widowed: '鳏寡',
        }
    }

}