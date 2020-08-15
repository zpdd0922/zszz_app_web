
import _ from 'lodash';
import CryptoJS from 'crypto-js';

export function encodeUnicode(str) {
  const len = str.length;
  const outBuffer = new Array(len);
  let x = 0;

  while (true) {
    while (true) {
      while (x < len) {
        let paramChar = str.charAt(x++);
        if (paramChar === '\\') {
          paramChar = str.charAt(x++);
          if (paramChar === 'u') {
            let value = 0;

            for (let i = 0; i < 4; ++i) {
              paramChar = str.charAt(x++);
              switch (paramChar) {
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                  value = (value << 4) + paramChar - 48;
                  break;
                case ':':
                case ';':
                case '<':
                case '=':
                case '>':
                case '?':
                case '@':
                case 'G':
                case 'H':
                case 'I':
                case 'J':
                case 'K':
                case 'L':
                case 'M':
                case 'N':
                case 'O':
                case 'P':
                case 'Q':
                case 'R':
                case 'S':
                case 'T':
                case 'U':
                case 'V':
                case 'W':
                case 'X':
                case 'Y':
                case 'Z':
                case '[':
                case '\\':
                case ']':
                case '^':
                case '_':
                case '`':
                case 'A':
                case 'B':
                case 'C':
                case 'D':
                case 'E':
                case 'F':
                  value = (value << 4) + 10 + paramChar - 65;
                  break;
                case 'a':
                case 'b':
                case 'c':
                case 'd':
                case 'e':
                case 'f':
                  value = (value << 4) + 10 + paramChar - 97;
              }
            }

            outBuffer.push(value);
          } else {
            outBuffer.push(paramChar);
          }
        } else {
          outBuffer.push(paramChar);
        }
      }

      return outBuffer.join('');
    }
  }
}

export function sortStr(str) {
  const arr = str.split('');
  const newArr = _.sortBy(arr, (o) => o[0]);
  return newArr.join('');
}

function regStr(str) {
  const reg = /[^0-9a-zA-Z\u4e00-\u9fa5]/g;
  return str.replace(reg, '');
}

export function getSHASign(key, params) {
  // 字符串化
  let paramsStr = JSON.stringify(params);
  // console.log('字符串化:', paramsStr);

  // 格式化
  paramsStr = encodeUnicode(paramsStr);
  // console.log('格式化:', paramsStr);

  // 过滤
  paramsStr = regStr(paramsStr);
  // console.log('过滤:', paramsStr);

  // 编码
  paramsStr = encodeURIComponent(paramsStr);
  // console.log('编码:', paramsStr);

  // 排序
  paramsStr = sortStr(paramsStr);
  // console.log('排序:', paramsStr);

  // 签名串
  let signStr = key + paramsStr + key;
  // console.log('签名串:', signStr);

  const signSha1 = CryptoJS.SHA1(signStr);

  // console.log('签名SHA1', signSha1);

  const sign = CryptoJS.enc.Base64.stringify(signSha1);

  // console.log("签名BASE64", sign)
  return sign;
}