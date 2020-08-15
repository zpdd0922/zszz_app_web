/*
 * @Author: Jim
 * @Date: 2019-03-20 10:20:43
 * @LastEditors  : Jim
 * @LastEditTime : 2019-12-18 15:36:13
 * @Description: 处理Storage相关的一些常规方法
 */

const PREFIX = 'cache___';

/**
 * 存入Storage
 * @param key 设置指定key值
 * @param val 设置指定value值
 * Example: setStorage('key', { a1: '111', a2: 222 })-> key:{ a1: '111', a2: 222 }
 */
const set = (key, val) => localStorage.setItem(PREFIX + key, JSON.stringify(val));

/**
 * 获取Storage
 * @param key 指定key值
 * @returns  {any}
 * Example: getStorage('key')-> { a1: '111', a2: 222 }
 */
const get = (key) => {
  let storageVal = localStorage.getItem(PREFIX + key);
  try {
    return storageVal === 'undefined' || storageVal === '' ? '' : JSON.parse(storageVal);
  } catch (e) {
    return storageVal;
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
    return !Object.is(get(key), null);
  }
  set(key, defaultVal);
  return get(key) ? get(key) : defaultVal;
};

/**
 *  移除指定Storage
 * @param key 移除指定key值
 * Example: removeStorage('key')
 */
const remove = (key) => localStorage.removeItem(PREFIX + key);

/**
 * 清空所有Storage数据
 * Example: clearStorage()
 */
const clear = () => {
  Object.keys(localStorage).filter(i => i.startsWith(PREFIX)).forEach(j => localStorage.removeItem(j));
}

/**
 * 清空所有Storage数据
 * Example: clearStorage()
 */
const clearAll = () => localStorage.clear();

export default { set, get, has, remove, clear, clearAll };
