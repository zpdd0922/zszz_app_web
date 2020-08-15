/**
 * 护照起始日
 * @param {*} args
 */
export const formatPassportStartDate = (args) => {
  const { nationality, dateStartValue, passportStartValue } = args;
  if (nationality === '0') {
    return dateStartValue;
  }
  if (nationality === '2') {
    return passportStartValue;
  }
  return '';
};

/**
 * 护照截止日
 * @param {*} args
 */
export const formatPassportEndDate = (args) => {
  const { nationality, dateEndValue, passportEndValue } = args;
  if (nationality === '0') {
    return dateEndValue;
  }
  if (nationality === '2') {
    return passportEndValue;
  }
  return '';
};
