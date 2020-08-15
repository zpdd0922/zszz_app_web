/*
 * @Author: Jim
 * @Date: 2019-12-17 13:09:05
 * @LastEditors  : Jim
 * @LastEditTime : 2020-01-14 17:06:49
 * @Description:
 */
import { toast } from '@/main/utils/common/tips/';
import ResCode from '../config/res-code';
import BroadCast, { BROADCAST_ENUMS } from '@/main/utils/common/broadcast';

export const STATUS_UPLOADING = 'uploading';
export const STATUS_SUCCESS = 'success';
export const STATUS_ERROR = 'error';

export default function upload(host, url, updateHeaders, data, options = {}) {
  return new Promise((resolve, reject) => {
    const target = host + url;

    const {
      imgType,
      callback,
    } = options;

    // 若没有上传进度函数，直接显示loading菊花图
    if (!callback) {
      BroadCast.send(BROADCAST_ENUMS.UPDATE_FETCH_STATUS, { isFetching: true });
    }

    const xhr = new XMLHttpRequest();

    const sendData = JSON.stringify(data);

    if (xhr.upload) {
      xhr.upload.onprogress = function progress(e) {
        if (e.total > 0) {
          e.percent = Math.floor(e.loaded / e.total * 100);
        }
        setStatus(e, STATUS_UPLOADING);
      };
    }

    xhr.onload = function onload(e) {
      if (xhr.status < 200 || xhr.status >= 300) {
        setStatus(e, STATUS_ERROR);
        return reject(setResponse());
      }

      const res = setResponse();
      const { code, message = '上传失败', result } = res;
      if (code !== ResCode.SUCCESS_CODE) {
        // -9999 未登录或者session已失效
        if (code === ResCode.LOGIN_EXPRICE_CODE) {
          BroadCast.send(BROADCAST_ENUMS.LOGIN_EXPRIS);
        } else {
          toast({
            type: 'error',
            txt: message
          });
        }
        setStatus(e, STATUS_ERROR);
        return reject(res);
      }
      setStatus(e, STATUS_SUCCESS);
      return resolve(result);
    };

    xhr.onerror = function error(e) {
      setStatus(e, STATUS_ERROR);
      return reject(setResponse());
    };

    function setStatus(e, status) {
      e.status = status;
      // 处理回调或者结束loading菊花图
      if (callback) {
        callback(imgType, e);
      } else {
        BroadCast.send(BROADCAST_ENUMS.UPDATE_FETCH_STATUS, { isFetching: false });
      }
    }

    function setResponse() {
      let response = xhr.responseText || xhr.response;
      try {
        response = JSON.parse(response);
      } catch (e) { }
      return response;
    }

    xhr.open('post', target, true);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.setRequestHeader('accept', 'application/json;charset=UTF-8');
    if (typeof updateHeaders === 'function') {
      const headers = updateHeaders();
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      })
    }
    xhr.send(sendData);
  });
}
