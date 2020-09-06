import cookie from 'cookie'

// cookie处理
export default class Cookie {
  static setCookieUpdate(key, data = {}) {
    const temp = { ...Cookie.getJSONCookie(key), ...data }
    console.log(key, temp)
    Cookie.setCookie(key, temp)
  }

  static setCookie(name, val, option) {
    const v = (typeof val === 'string') ? val : JSON.stringify(val)
    document.cookie = cookie.serialize(name, v, option)
  }

  static getCookie(cName) {
    const p = cookie.parse(document.cookie)
    if (cName in p) {
      return p[cName]
    }
    return null
  }

  static getJSONCookie(cName) {
    const t = Cookie.getCookie(cName) || '{}'
    return JSON.parse(t)
  }

  static deleteCookie(cName) {
    Cookie.setCookie(cName, '', { maxAge: -1 })
  }
}
