/***************************
 * 处理表单验证相关的一些常规方法
 ***************************/

export default class Validate {
  // 手机号码
  static isMobile = mobile => {
    if (typeof mobile !== 'string' || mobile === "") {
      return false;
      // throw error('Bad Phone Number!')
    }

    if (!Validate.isCnMobile(mobile) && !Validate.isInternationalMobile(mobile)) {
      return false;
    }
    return true;
  }
  static isCnMobile = mobile => {
    if (typeof mobile !== 'string' || mobile === "") {
      // throw error('Bad Phone Number!')
    }

    let str = mobile;

    if (str.indexOf('-') !== -1) {
      const arr = str.split("-");
      const str = arr[1]
    }

    const reg = /^1[3-9]\d{9}$/;
    return reg.test(str);
  }
  static isInternationalMobile = mobile => {
    if (typeof mobile !== 'string' || mobile === "") {
      return false;
      // throw error('Bad Phone Number!')
    }
    const str = mobile.replace("-", "");
    const reg = /^[0-9]+$/;
    return reg.test(str);
  }
  // 身份证号码
  static isIdCard = str => {
    const reg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
    return reg.test(str);
  }
  static isAllChinese = str => {
    const reg = /^[\u4e00-\u9fa5]+$/gi;
    return reg.test(str);
  }
  //账户号码 限制字母和数字
  static isAccountNum = str => {
    const regExp = /^[0-9a-zA-Z]+$/;
    return regExp.test(str);
  }
  //银行名字 限制字母、数字、简繁体和括号
  static isBankName = str => {
    const regExp = /^[\u4e00-\u9fa5a-zA-Z0-9\(\)]+$/;
    return regExp.test(str);
  }
  //银行账号
  static isBankNum = str => {
    const regExp = /^[A-Za-z0-9]+$/;
    return regExp.test(str);
  }
  //交易密码 由英文字母和数字组成的8位密码
  static isTradePwd = str => {
    const regExp = /^[A-Za-z0-9]{8}$/;
    return regExp.test(str)
  }
  //英文
  static isEn = str => {
    const regExp = /^[A-Za-z]+$/;
    return regExp.test(str)
  }
  //英文名字 
  static isEnName = str => {
    const val = str.replace(/\s+/, '')
    const regExp = /^[A-Za-z.·]+$/;
    return regExp.test(val)
  }
  //香港身份证 
  static isHkIdCard = str => {
    const regExp = /^[A-Za-z0-9\(\)]+$/;
    return regExp.test(str)
  }
  static isNumber = str => {
    const reg = /^\d+$/
    return reg.test(str)
  }
};
