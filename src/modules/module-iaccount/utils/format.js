/***************************
 * 处理数据格式化 信息
 ***************************/

/**
 * 数字转换
 * @param val <String>
 */
export const formatNumber = function (val, { digit = 0 } = {}) {
  if (!val && val !== 0) return val

  val = String(val)
  const maxLength = val.length
  val = val.replace(/(^\s*)/g, '')

  // 保留小数点位数
  if (digit) {
    val = val.replace(/[^0-9.]/g, '')
    const valueArr = val.split('.')
    const valNum = valueArr[0]
    const valFloat = valueArr[1]
    if (typeof valFloat !== 'string') {
      val = valNum
    } else if (valFloat.length <= digit) {
      val = Number(valNum) + '.' + valFloat
    } else if (valFloat.length > digit) {
      val = Number(valNum) + '.' + valFloat.substr(0, digit)
    }
  } else {
    // 纯数字
    val = val.replace(/[^0-9]/g, '')
  }

  return maxLength <= 0 ? val : val.slice(0, maxLength)
}

/**
 * 字符串分隔符
 * 默认 4 位
 */
export function formatStepSpace(val, step = 4) {
  if (!val) return ''
  val = val.replace(/\s+/ig, '')
  const reg = new RegExp(`(.{${step}})`, 'g')
  return val.replace(reg, '$1 ').replace(/(^\s*)|(\s*$)/g, '')
}

/**
 * 把输入的字符串转换为半角
 * input： Str 任意字符串
 * output：DBCStr 半角字符串
 * 说明：1、全角空格为12288，半角空格为32
        2、其他字符半角(33-126)与全角(65281-65374)的对应关系是：均相差65248
*/
export function formatToDBC(Str) {
  if (!Str || (typeof Str === 'object')) return Str
  let DBCStr = ''
  for (let i = 0; i < Str.length; i++) {
    const c = Str.charCodeAt(i)
    if (c === 12288) {
      DBCStr += String.fromCharCode(32)
      continue
    }

    if (c > 65280 && c < 65375) {
      DBCStr += String.fromCharCode(c - 65248)
      continue
    }

    DBCStr += String.fromCharCode(c)
  }
  return DBCStr
}
