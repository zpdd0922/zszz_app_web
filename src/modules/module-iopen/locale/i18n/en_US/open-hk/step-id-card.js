import customizeI18n from '@/customize/locale/i18n/zh_HK';
import commonI18n from '@/main/locale/i18n/zh_HK';

export default {
    pageName: '請上傳本人身份證件',
    tips: {
        idCardCn: "中國大陸身份證人像面、中國大陸身份證國徽面",
        idCardHk: "香港居民身份證人像面",
        idCardHkTemp: "香港居民身份證人像面、香港簽證身份書",
        passport: "護照內頁（非中國大陸護照）",
    },
    desc: {
        title: '拍攝注意事項',
        content: [
            '1、中國大陸和中國香港提供身份證，其他地區提供護照。',
            '2、請確保證件內容清晰可見，無反光，缺角。'
        ],
    },
    idKindKey: {
        label: '證件類型',
        placeholder: '請選擇證件類型'
    },
}