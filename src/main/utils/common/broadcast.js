/*
 * @Author: Jim
 * @Date: 2019-03-20 10:20:42
 * @LastEditors  : Jim
 * @LastEditTime : 2019-12-18 15:14:46
 * @Description: 基于vue全局广播/订阅
 */
import Vue from 'vue';
const broadcast = new Vue();

export const BROADCAST_ENUMS = {
  TEST: 'TEST',
  UPDATE_TITLE: 'UPDATE_TITLE',
  UPDATE_FETCH_STATUS: 'UPDATE_FETCH_STATUS',
  LOGIN_EXPRIS: 'LOGIN_EXPRIS',
};

const send = (key, d) => broadcast.$emit(key, d);
const onmessage = (key, callback) => broadcast.$on(key, e => {
  callback(e);
});

export default { send, onmessage };
