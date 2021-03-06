import customizeI18n from '@/customize/locale/i18n/zh_HK';
import commonI18n from '@/main/locale/i18n/zh_HK';

export default {
    pageName: '資料填寫',
    contact: {
        title: '聯繫信息',
        radioOptions: {
            cn: '大陸地區',
            hk: '香港地區',
            oth: '其他地區',
            idCard: '同身份證地址',
            company: '同公司地址',
            home: '同現時住址',
        },
        email: {
            label: '郵箱',
            placeholder: '請填寫您的電子郵箱'
        },
        educationLevel: {
            label: '教育程度',
            placeholder: '請選擇教育程度',
            options: {
                a: '小學',
                b: '中學',
                c: '專上學院',
                d: '大學或以上',
            }
        },
        homeRadio: {
            label: '現時住址',
            placeholder: '請選擇',
        },
        homeTelePhone: {
            label: '住址電話',
            placeholder: '現時住址聯繫電話(選填)'
        },
        contactRadio: {
            label: '通訊地址',
            placeholder: '請選擇',

        },
        contactTelePhone: {
            label: '通訊電話',
            placeholder: '通訊地址聯繫電話(選填)'
        },
        addressCity: {
            label: '省市區',
            placeholder: '請選擇省市區'
        },
        addressDetail: {
            label: '詳細地址',
            placeholder: '請填寫詳細地址信息',
            placeholderOther: '請填寫詳細地址信息',
        },
        addressNumber: {
            label: '樓層/門牌號',
            placeholder: '詳細樓層/門牌號，如幾棟幾樓和房號',
        },
        addressOtherCountry: {
            label: '國家/地區',
            placeholder: '請選擇國家/地區'
        },
        addressOtherRepublic: {
            label: '國家/地區',
            placeholder: '請用英文輸入國家/地區'
        },
        addressOtherProvince: {
            label: '省份',
            placeholder: '請輸入省份'
        },
        addressOtherCity: {
            label: '城市',
            placeholder: '請輸入城市'
        },
        addressOtherArea: {
            label: '區域',
            placeholder: '請輸入區域'
        },
    },
    profession: {
        title: '工作狀況',
        professionCode: {
            label: '就業情況',
            placeholder: '請選擇',
            options: {
                employed: '受僱',
                selfEmployed: '自僱',
                retired: '退休',
                others: '其他',
            }
        },
        professionCodeOther: { label: '其他就業情況', placeholder: '請填寫' },
        companyName: { label: '公司名稱', placeholder: '請填寫您的公司名稱' },
        industryRange: { label: '營業範圍', placeholder: '請填寫營業範圍' },
        jobPosition: {
            label: '職位級別',
            placeholder: '請選擇職位級別',
            options: {
                a: '高層管理',
                b: '中層管理',
                c: '普通員工',
            }
        },
        workingSeniority: {
            label: '從業年限',
            placeholder: '請選擇',
            options: {
                a: '少於5年',
                b: '5-10年',
                c: '10年以上',
            }
        },
        companyTelePhone: { label: '辦公室電話', placeholder: '請填寫(選填)' },
        companyAddress: { label: '公司地址', placeholder: '請填寫' },
    },
}