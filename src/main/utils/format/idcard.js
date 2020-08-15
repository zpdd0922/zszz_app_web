/*
 * @Author: Jim
 * @Date: 2019-12-18 16:45:05
 * @LastEditors  : Jim
 * @LastEditTime : 2019-12-18 16:47:50
 * @Description: 内地身份证相关
 */
// 根据身份证号码返回性别，'0'-男，'1'-女
export function getSexFromCard(card) {
  let male = '0';
  if (card.length === 15) {
    male = card.substr(14, 1);

    if (male % 2 === 0) {
      return '1';
    } else {
      return '0';
    }
  }
  if (card.length === 18) {
    male = card.substr(16, 1);
    if (male % 2 === 0) {
      return '1';
    } else {
      return '0';
    }
  }
  return male;
}

// 根据身份证号码返回出生日期，比如1986-08-09
export function getBirthFromCard(card) {
  let year, month, day;
  if (card.length === 15) {
    year = card.substr(6, 2);
    month = card.substr(8, 2);
    day = card.substr(10, 2);
    return '19' + year + '-' + month + '-' + day;
  }
  if (card.length === 18) {
    year = card.substr(6, 4);
    month = card.substr(10, 2);
    day = card.substr(12, 2);
    return year + '-' + month + '-' + day;
  }
  return '';
}


/**
 * 计算年龄
 * @param {string} birthday 出生日期
 * @param {string} today  当前日期
 * @param {number} temp  1 向下取整
 * 向下取整  例如 10岁 20天 会计算成 10岁
 */
export const getAge = (birthday, compareDate) => {
  let returnAge;
  let d;
  const strBirthdayArr = birthday.split('-');
  const birthYear = strBirthdayArr[0];
  const birthMonth = strBirthdayArr[1];
  const birthDay = strBirthdayArr[2];

  if (compareDate) {
    d = compareDate;
  } else {
    d = new Date();
  }
  const nowYear = d.getFullYear();
  const nowMonth = d.getMonth() + 1;
  const nowDay = d.getDate();

  /* eslint-disable */
  if (nowYear == birthYear) {
    returnAge = 0// 同年 则为0岁
  } else {
    const ageDiff = nowYear - birthYear // 年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        const dayDiff = nowDay - birthDay// 日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      } else {
        const monthDiff = nowMonth - birthMonth// 月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1
        } else {
          returnAge = ageDiff
        }
      }
    } else {
      returnAge = -1// 返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return returnAge// 返回周岁年龄
}
