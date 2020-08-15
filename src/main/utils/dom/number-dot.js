/* eslint-disable */

// 包含数字，小数点
export const numberDot = function (val, len = 2) {
  const maxLength = val.maxLength;
  val = val.replace(/(^\s*)/g, '');
  // 不允许输入非数字、小数点
  val = val.replace(/[^0-9.]/g, '');
  const valueArr = val.split('.');
  const valNum = valueArr[0];
  const valFloat = valueArr[1];
  if (typeof valFloat !== 'string') {
    val = valNum;
  } else if (valFloat.length <= len) {
    val = valNum + '.' + valFloat
  } else if (valFloat.length > len) {
    val = valNum + '.' + valFloat.substr(0, len);
  }
  return maxLength <= 0 ? val : val.slice(0, maxLength);
}

// 纯数字
export const numberInput = function (val) {
  const maxLength = val.maxLength;
  val = val.replace(/(^\s*)/g, '');
  // 不允许输入非数字
  val = val.replace(/[^0-9]/g, '');
  return maxLength <= 0 ? val : val.slice(0, maxLength);
}