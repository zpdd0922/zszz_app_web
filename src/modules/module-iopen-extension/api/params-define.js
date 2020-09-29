// base64编码前缀
export const BASE64 = 'data:image/jpeg;base64,';

// 上传文件定义后缀 idCardFace -->  idCardFacePath
export const SUFFIX = 'Path';

export const IDCardFace = 'idCardFace';
export const IDCardBack = 'idCardBack';
export const IdCardHK = 'idCardHK';
export const TemporaryIdCardHK = 'temporaryIdCardHK';
export const TemporaryIdCardProveHK = 'temporaryIdCardProveHK';
export const Passport = 'passport';
export const BankCardFace = 'bankCardFace';
export const Address = 'address';
export const AvatarFinger1 = 'avatarFinger1';
export const AvatarFinger2 = 'avatarFinger2';
export const AvatarFinger3 = 'avatarFinger3';
export const AvatarFinger4 = 'avatarFinger4';
export const AvatarFinger5 = 'avatarFinger5';
export const AvatarCard = 'avatarCard';
export const AvatarHead = 'avatarHead';
export const AvatarBlink = 'avatarBlink';
export const AvatarMount = 'avatarMount';
export const AvatarHeadYaw = 'avatarHeadYaw';
export const AvatarHeadNod = 'avatarHeadNod';
export const Signature = 'signature';
export const SignatureInfo = 'signatureInfo';
export const InfoFace = 'infoFace';
export const DerivativeImg = 'derivativeImg';
export const CourseImg = 'courseImg';
export const IndustryImg = 'industryImg';

// location 1：身份证 2：银行卡 3：签名照 4：正面照 5：活体

/* 关于图片信息
* 101：身份证正面 102：身份证反面 103: 香港身份证 104：护照
* 201：银行卡
* 301：签名  302：签名信息
* 401：手持身份证正面照 402：正面照
* 501：1根手指 502：2根手指 503：3根手指 504：4根手指 505：5根手指
* 506：眨眼睛LIVE_BLINK   507：张嘴巴LIVE_MOUTH  508：点头LIVE_NOD   509：摇头LIVE_YAW
* 601: 衍生品课程  602: 衍生品相关行业  603: 衍生品交易凭证

* 大陆 H5      区别：活体--> 手指照，正面照
*      APP    区别：活体--> 随机活体检测(506~509)两张
*
* 香港 -> 国籍  大陆    香港及其他
*/
export const IMAGE_REQUEST_LIST = {
  [IDCardFace]: {
    location: 1,
    type: 101,
    ocr: 0,
    stType: 1,
    txt: '身份证正面人像照',
    placehold: require('@/modules/module-iopen/assets/images/id-card/face-model.png')
  },
  [IDCardBack]: {
    location: 1,
    type: 102,
    ocr: 0,
    stType: 2,
    txt: '身份证背面国徽照',
    placehold: require('@/modules/module-iopen/assets/images/id-card/back-model.png')
  },
  [IdCardHK]: {
    location: 1,
    type: 103,
    ocr: 0,
    txt: '香港身份证人像正面照',
    placehold: require('@/modules/module-iopen/assets/images/id-card/id-card-hk.png')
  },
  [TemporaryIdCardHK]: {
    location: 1,
    type: 103,
    ocr: 0,
    txt: '香港身份证人像正面照',
    placehold: require('@/modules/module-iopen/assets/images/id-card/id-card-hk-prove.png')
  },
  [TemporaryIdCardProveHK]: {
    location: 1,
    type: 105,
    ocr: 0,
    placehold: require("@/modules/module-iopen/assets/images/id-card/temporary-hk-id-card-bg.png"),
    // preview: require("@/modules/module-iopen/assets/images/bank-card/temporary-hk-id-card.png")
  },
  [Passport]: {
    location: 1,
    type: 104,
    ocr: 0,
    txt: '护照内页照',
    placehold: require("@/modules/module-iopen/assets/images/id-card/passport.png"),
  },
  [AvatarFinger1]: {
    location: 5,
    type: 501,
    ocr: 0,
    txt: '手举1个指头照',
    placehold: require('@/modules/module-iopen/assets/images/avatar/avatar-finger1.png')
  },
  [AvatarFinger2]: {
    location: 5,
    type: 502,
    ocr: 0,
    txt: '手举2个指头照',
    placehold: require('@/modules/module-iopen/assets/images/avatar/avatar-finger2.png')
  },
  [AvatarFinger3]: {
    location: 5,
    type: 503,
    ocr: 0,
    txt: '手举3个指头照',
    placehold: require('@/modules/module-iopen/assets/images/avatar/avatar-finger3.png')
  },
  [AvatarFinger4]: {
    location: 5,
    type: 504,
    ocr: 0,
    txt: '手举4个指头照',
    placehold: require('@/modules/module-iopen/assets/images/avatar/avatar-finger4.png')
  },
  [AvatarFinger5]: {
    location: 5,
    type: 505,
    ocr: 0,
    txt: '手举5个指头照',
    placehold: require('@/modules/module-iopen/assets/images/avatar/avatar-finger5.png')
  },
  [AvatarCard]: {
    location: 4,
    type: 401,
    ocr: 0,
    txt: '手举身份证正面照',
    placehold: require('@/modules/module-iopen/assets/images/avatar/avatar-card.png')
  },
  [AvatarHead]: {
    location: 4,
    type: 402,
    ocr: 0,
    txt: '正面照',
    placehold: require('@/modules/module-iopen/assets/images/avatar/avatar-head.png')
  },
  [BankCardFace]: {
    location: 2,
    type: 201,
    ocr: 0,
    stType: 0,
    txt: '银行卡正面照',
    placehold: require('@/modules/module-iopen/assets/images/bank-card/bank-card-1.png')
  },
  [Signature]: {
    location: 3,
    type: 301,
    ocr: 0
  },
  [SignatureInfo]: {
    location: 3,
    type: 302,
    ocr: 0
  },
  [AvatarBlink]: {
    location: 5,
    type: 506,
    ocr: 0,
    sequences: 0
  },
  [AvatarMount]: {
    location: 5,
    type: 507,
    ocr: 0,
    sequences: 1
  },
  [AvatarHeadNod]: {
    location: 5,
    type: 508,
    ocr: 0,
    sequences: 2
  },
  [AvatarHeadYaw]: {
    location: 5,
    type: 509,
    ocr: 0,
    sequences: 3
  },
  [CourseImg]: {
    location: 6,
    type: 601,
    ocr: 0
  },
  [IndustryImg]: {
    location: 6,
    type: 602,
    ocr: 0
  },
  [DerivativeImg]: {
    location: 6,
    type: 603,
    ocr: 0
  },
  [Address]: {
    location: 6,
    type: 604,
    ocr: 0,
    stType: 0,
    txt: '地址证明',
    placehold: require('@/modules/module-iopen/assets/images/common/cross.png')
  },
};

// 性别选项
export const sexOptions = [
  { text: '男', value: '0' },
  { text: '女', value: '1' }
];

/**
 * openType
 * 1: 只查询线上开户情况
 * 2: 线上线下开户状态均查询
 */

export const OPEN_STATUS_TYPE = 1;

/**
 * 下拉选项
 */

// 所属行业
export const WEB_OCCUPATION_TYPE = 'AO_OCCUPATION_TYPE';
// 国家地区
export const AO_NATIONALITY = 'AO_NATIONALITY';
// 投资目标类型
export const AO_INVEST_TARGET = 'AO_INVEST_TARGET';
// 证件类型
export const AO_ID_KIND = 'AO_ID_KIND';
