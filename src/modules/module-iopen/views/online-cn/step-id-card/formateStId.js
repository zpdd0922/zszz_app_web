import { BASE64, IDCardFace, IDCardBack, sexOptions } from '../../../api/params-define';
import { dateFormat, format2date } from '@/main/utils/format/date';

// 身份证正面
const toFormatIdCardFrontData = (data) => {
  const {
    idCardFrontImage,
    idCardFrontImageUrl,
    idCardName,
    idCardSex,
    idCardNation,
    idCardDate,
    idCardAddress,
    idCardID
  } = data;

  if (!idCardFrontImage && !idCardFrontImageUrl) {
    return {
      idCardSTInfo: {},
      idCardInfo: {},
      idCardImgInfo: {}
    };
  }
  const idCardTime = idCardDate && idCardDate !== '' ? dateFormat(idCardDate, 'yyyy-mm-dd') : '';

  const idCardSTInfo = {
    idCardName,
    idCardSex,
    idCardDate: idCardTime,
    idCardAddress,
    idCardID,
    idCardNation
  };

  const idCardInfo = {
    cnNameValue: idCardName,
    addressValue: idCardAddress,
    birthday: idCardTime
  };

  // 设置性别
  const { value } = sexOptions.find(val => val.text === idCardSex) || { value: '0' };
  idCardInfo.sex = value;

  if (/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(idCardID)) idCardInfo.idCardValue = idCardID;

  const idCardImgInfo = {
    imgType: IDCardFace,
    imgData: `${BASE64}${idCardFrontImage}`,
    imgDataUrl: idCardFrontImageUrl
  };

  return { idCardSTInfo, idCardInfo, idCardImgInfo };
};

// 身份证背面
const toFormatIdCardBackData = (data) => {
  const {
    idCardBackImage = '',
    idCardBackImageUrl = '',
    idCardValidity,
    idCardAuthority
  } = data;

  if ((!idCardBackImage || idCardBackImage === '') && (!idCardBackImageUrl || idCardBackImageUrl === '')) {
    return {
      idCardSTInfo: {},
      idCardInfo: {},
      idCardImgInfo: {}
    };
  }

  const idCardSTInfo = {
    idCardValidity,
    idCardAuthority
  };

  const [
    idCardValidStart, idCardValidEnd
  ] = idCardValidity.split('-');

  const idCardInfo = {
    dateStartValue: format2date(idCardValidStart),
    dateEndValue: idCardValidEnd === '长期' ? '长期' : format2date(idCardValidEnd),
    isLonger: idCardValidEnd === '长期'
  };

  const idCardImgInfo = {
    imgType: IDCardBack,
    imgData: `${BASE64}${idCardBackImage}`,
    imgDataUrl: idCardBackImageUrl
  };

  return { idCardSTInfo, idCardInfo, idCardImgInfo };
};

// 转换扫描信息字段
export const getStIDCardData = (data) => {
  const idCardFrontData = toFormatIdCardFrontData(data);
  const idCardBackData = toFormatIdCardBackData(data);

  const imgInfo = {
    ...idCardFrontData.idCardImgInfo,
    ...idCardBackData.idCardImgInfo
  };

  const { imgType, imgData, imgDataUrl } = imgInfo;
  const idCardImg = { imgType, imgData, imgDataUrl };

  const idCardInfo = { ...idCardFrontData.idCardInfo, ...idCardBackData.idCardInfo };
  const idCardSTInfo = { ...idCardFrontData.idCardSTInfo, ...idCardBackData.idCardSTInfo };

  return { idCardImg, idCardInfo, idCardSTInfo };
};
