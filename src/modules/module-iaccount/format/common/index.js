/**
 * 入金网银表单格式
 */
export const format_Form = (formList = [], data = {}, params = {}) => {
  return formList.map(item => {
    let obj = {}
    let keys = Object.keys(item.custom || {})
    keys.forEach(key => {
      const sub = item.custom[key]
      if (typeof sub === 'function') {
        obj[key] = sub(data, params)
      } else {
        obj[key] = data[sub]
      }
    })
    return {
      ...item,
      ...obj
    }
  })
}

/**
 * 截取银行卡位数
 * @param val <String> 卡号
 * @param step <Number> 截取位数。默认后4位
 */
export const format_getBankAccount = (val = '', step = -4) => {
  val = String(val).replace(/\s+/g, '')
  return val.substr(step)
}