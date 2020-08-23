import customizeI18n from '@/customize/locale/i18n/zh_CN';
import commonI18n from '@/main/locale/i18n/zh_CN';

export default {
    pageName: '请上传本人身份证件',
    tips: {
        idCardCn: "中国大陆身份证人像面、中国大陆身份证国徽面",
        idCardHk: "香港居民身份证人像面",
        idCardHkTemp: "香港居民身份证人像面、香港签证身份书",
        passport: "护照内页（非中国大陆护照）",
    },
    desc: {
        title: '拍摄注意事项',
        content: [
            '1、中国大陆和中国香港提供身份证，其他地区提供护照。',
            '2、请确保证件内容清晰可见，无反光，缺角。'
        ],
    },
    idKindKey: {
        label: '证件类型',
        placeholder: '请选择证件类型'
    },
}