/*
 * @Author: Jim
 * @Date: 2019-12-18 20:54:30
 * @LastEditors  : Jim
 * @LastEditTime : 2019-12-18 21:01:48
 * @Description:
 */
import { IDCardFace, IDCardBack, sexOptions } from '../../api/params-define';
import { format2date, dateymd2date } from '@/main/utils/format/date';
import { getSpellName } from '@/main/utils/format/formatter';

// 身份证正面
const toFormatIdCardFrontData = (res) => {
  const {
    name: cnNameValue,
    sex,
    address: addressValue,
    nation,
    birth,
    idNum: number
  } = res;


  const [year, month, day] = birth.split("/")

  const idCardInfo = {
    cnNameValue,
    addressValue,
    birthday: dateymd2date(year, month, day),
    nation,
    ...getSpellName(cnNameValue)
  };

  // 设置性别
  const { value } = sexOptions.find(val => val.text === sex) || { value: '0' };
  idCardInfo.sex = value;

  // 身份证
  if (/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(number)) idCardInfo.idCardValue = number;

  return { ...idCardInfo };
};

// 身份证背面
const toFormatIdCardBackData = (res) => {
  console.log(res);
  const {
    validDate: timelimit,
    authority
  } = res;

  const [
    idCardValidStart, idCardValidEnd
  ] = timelimit.split('-');

  const idCardInfo = {
    dateStartValue: format2date(idCardValidStart),
    dateEndValue: idCardValidEnd === '长期' ? '长期' : format2date(idCardValidEnd),
    isLonger: idCardValidEnd === '长期',
    authority
  };

  return { ...idCardInfo };
};

// 转换扫描信息字段
export const getOcrIDCardData = (data, imgType) => {
  const idCardFrontData = imgType === IDCardFace ? toFormatIdCardFrontData(data) : {};
  const idCardBackData = imgType === IDCardBack ? toFormatIdCardBackData(data) : {};

  const ocrInfo = { ...idCardFrontData, ...idCardBackData };

  return { ocrInfo };
};
