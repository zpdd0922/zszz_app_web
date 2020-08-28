import i18n from '@/modules/module-iopen/locale/'
import { IDCardFace, IDCardBack, IdCardHK, Passport, TemporaryIdCardHK } from '../../../api/params-define';

// 国籍 0 中国大陆 1 中国香港 2 其他地区
// 证件类型 card[0=未知 1=大陆居民身份证 2=香港永久身份证 3=护照 4=香港临时身份证]
export const nationOptions = {
  idCardCn: { key: 'idCardCn', text: i18n.t("iOpen.common.idKind.idCardCn"), value: '1', upload: [IDCardFace, IDCardBack] },
  idCardHk: { key: 'idCardHk', text: i18n.t("iOpen.common.idKind.idCardHk"), value: '2', upload: [IdCardHK] },
  idCardHkTemp: { key: 'idCardHkTemp', text: i18n.t("iOpen.common.idKind.idCardHkTemp"), value: '4', upload: [TemporaryIdCardHK] },
  passport: { key: 'passport', text: i18n.t("iOpen.common.idKind.passport"), value: '3', upload: [Passport] }
};
