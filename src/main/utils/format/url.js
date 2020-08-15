/* eslint-disable */
/*
 * @Author: Jim
 * @Date: 2019-03-20 10:20:43
 * @LastEditors  : Jim
 * @LastEditTime : 2019-12-18 14:03:25
 * @Description: 
 */

/**
 * Usage: 返回当前 URL。
 * “使用window.location.href获取当前 URL。”
 * @return 布尔值
 * Example:currentUrl() -> 'https://google.com'
 */
export const currentURL = () => window.location.href;

export const getHost = (str) => {
  if (typeof str !== 'string' || str === '') return '';
  const re = /^(https?:\/\/)/g;
  const host = str.replace(re, '').split('/')[0];
  return host;
};

export const isSameHost = (url1, url2) => {
  const u1 = getHost(url1);
  const u2 = getHost(url2);
  if (!u1 || !u2) return false;
  return u1 === u2;
};

/**
 * Usage: 返回一个包含当前 URL 参数的对象。
 * “使用window.location.href或window.location.replace()重定向到url。传递第二个参数以模拟链接单击 (true -默认值) 或 HTTP 重定向 (false).”
 * Example:redirect('https://google.com')
 */
export const redirect = (url, asLink = true) => asLink ? (window.location.href = url) : (window.location.replace(url));


/**
 * Usage: 返回一个包含当前 URL 参数的对象。
 * “使用match()与适当的正则表达式来获取所有键值对, Array.reduce()可将它们映射并合并到单个对象中。将location.search作为要应用于当前url的参数传递.”
 * Example: getURLParameters('http://url.com/page?name=Adam&surname=Smith') -> {name: 'Adam', surname: 'Smith'}
 */
export const getURLParameters = (url = currentURL()) => {
  const arrList = url.split('#');

  const paramData = {};

  arrList.forEach((strItem) => {
    let str = strItem; // 取得整个地址栏
    const num = str.indexOf('?');
    str = str.substr(num + 1); // 取得所有参数   stringvar.substr(start [, length ]
    if (num > -1) {
      const arr = str.split('&'); // 各个参数放到数组里
      for (let i = 0; i < arr.length; i += 1) {
        const n = arr[i].indexOf('=');
        if (n > 0) {
          // "&key=value" 键值对
          const key = arr[i].substring(0, n);
          const value = arr[i].substr(n + 1);
          let realValue = decodeURIComponent(value);
          if (realValue === "true") reqlValue = true;
          if (realValue === "false") reqlValue = false;
          
          paramData[key] = realValue
        } else {
          // "&key" 仅标识
          const key = arr[i];
          if (key !== '') paramData[key] = true;
        }
      }
    }
  });

  return paramData;
}


/**
 * Usage:  将一个对象转换为url的参数拼接
 */
export function parseJson2Query(opt = {}, url = '') {
  if (typeof url !== 'string') return '';
  let urlPro = '';
  let urlEnd = '';
  if (url !== '') {
    urlPro = url.startsWith('http') ? '' : 'http://';
    urlEnd = '?';
  }
  const completeUrl = `${urlPro}${url}${urlEnd}`;
  const options = Object.keys(opt).reduce((arr, obj) => [...arr, `${obj}=${encodeURIComponent(opt[obj])}`], []);
  return `${completeUrl}${options.join('&')}`;
}

export function urlParamJoin(obj) {
  let paramString = '';
  if (obj !== null) {
    Object.keys(obj).forEach(key => {
      if (obj[key] && obj[key] !== '') {
        if (paramString !== '') {
          paramString += '&';
        }
        paramString += `${key}=${encodeURIComponent(obj[key])}`;
      }

    });
  }

  return paramString;
}


/**
 * Usage: 返回一个包含当前 URL 参数的对象。
 * “使用match()与适当的正则表达式来获取所有键值对, Array.reduce()可将它们映射并合并到单个对象中。将location.search作为要应用于当前url的参数传递.”
 * Example: getURLParameters('http://url.com/page?name=Adam&surname=Smith') -> {name: 'Adam', surname: 'Smith'}
 */
// export const getURLParameters = (url = currentURL()) => {
//   const params = url.match(/([^?=&]+)(=([^(&|#)]*))/g);
//   if (params === null) {
//     return {};
//   } else {
//     return params.reduce(
//       (a, v) => {
//         a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1);
//         return a;
//       }, {}
//     );
//   }
// };

// /**
//  * Usage:  将一个对象转换为url的参数拼接
//  */
// export const objParseQuery = (param, key, encode) => {
//   if (param === null) return '';
//   let paramStr = '';
//   let t = typeof (param);
//   if (t === 'string' || t === 'number' || t === 'boolean') {
//     paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
//   } else {
//     for (let i in param) {
//       let k = key === null ? i : key + (param instanceof Array ? `[${i}]` : `.${i}`);
//       paramStr += objParseQuery(param[i], k, encode);
//     }
//   }
//   return paramStr;
// };

// /**
//  * 获取表单结构数据中指定参数的值
//  */
// export function getQueryString(str, name) {
//   const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
//   const r = str.match(reg);
//   if (r != null) return decodeURIComponent(r[2]);
//   return '';
// }