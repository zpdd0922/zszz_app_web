/*
 * @Author: Jim
 * @Date: 2019-03-20 10:20:43
 * @LastEditors  : Jim
 * @LastEditTime : 2019-12-18 15:36:13
 * @Description: 处理Storage相关的一些常规方法
 */
import cookie from 'cookie';

const PREFIX = 'cache___';

/**
 * 存入Storage
 * @param key 设置指定key值
 * @param val 设置指定value值
 * Example: setStorage('key', { a1: '111', a2: 222 })-> key:{ a1: '111', a2: 222 }
 */
const set = (key, val, option) => {
  document.cookie = cookie.serialize(PREFIX + key, JSON.stringify(val), option);
}

/**
 * 获取Cookie
 * @param key 指定key值
 * @returns  {any}
 * Example: get('key')-> { a1: '111', a2: 222 }
 */
const get = (key) => {
  let cookieVal = "";
  const realKey = PREFIX + key;
  const p = cookie.parse(document.cookie);
  if (realKey in p) {
    cookieVal = p[realKey];
  }

  try {
    return cookieVal === 'undefined' || cookieVal === '' ? '' : JSON.parse(cookieVal);
  } catch (e) {
    return cookieVal;
  }
};

/**
 * 判断是否有对应key值的storage， 如果没有返回指定的key值则可以自定义默认值，不设置则返回布尔值
 * @param key 指定key值
 * @param defaultVal
 * @returns Boolean
 * Example: hasStorage('key')-> true
 * Example: hasStorage('key',{ a1: '111', a2: 222 })-> key:{ a1: '111', a2: 222 }
 */
const has = (key, defaultVal) => {
  if (!defaultVal) {
    return !Object.is(get(PREFIX + key), null);
  }
  set(PREFIX + key, defaultVal);
  return get(PREFIX + key) ? get(PREFIX + key) : defaultVal;
};

/**
 *  移除指定Cookie
 * @param key 移除指定key值
 * Example: remove('key')
 */
const remove = (key) => {
  Cookie.setCookie(PREFIX + key, '', { maxAge: -1 });
}

export default { set, get, has, remove };
