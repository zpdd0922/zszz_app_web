/* eslint-disable */
// Disables all rules for the rest of the file
import UaInfo from '@/main/utils/common/ua-info';
import { useSysCamera } from '@/main/utils/native-app/';
import { getURLParameters } from '@/main/utils/format/url';
import getImageInBase64 from './get-img-base64';

export const CAMERA_TYPE = {
  SYSTEM_CAMERA: 0,
  CUSTOMER_CAMERA: 1
};

// 封装app交互调用相机
class NativeCameraJF {

  // ios 桥接预定义
  static setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
      return callback(WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }

    // 如果是在微信小程序端打开，则不创建iframe调用native方法并返回
    const getAllUrlParams = getURLParameters(window.location.href)
    if (getAllUrlParams && getAllUrlParams.isMp === '1') return;

    window.WVJBCallbacks = [callback];
    const WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(() => {
      document.documentElement.removeChild(WVJBIframe);
    }, 0);
  }

  // 交互
  static open({ tips, cameraType, isCanSelect, idCardFaceType }, callBack) {

    const toastMsg = tips || '';

    // TODO: 此处代码有点混乱。后期尽量优化

    if (UaInfo.isIOS()) {
      // ios8以上平台, 不可选择
      // TODO: 此处现在IOS回归使用老桥，新桥交互存在一定问题。

      const tipsInfo = toastMsg && toastMsg !== '' ? { tips: toastMsg } : {};
      const paramsIOS = {
        type: cameraType,
        idCardFace: idCardFaceType,
        ...tipsInfo,
      };
      console.log('paramsIOS', paramsIOS)
      NativeCameraJF.setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler('getAppleCam', paramsIOS, (data) => {
        });
        bridge.registerHandler('picUpload', (data, responseCallback) => {
          callBack(data.pic);
        });
      });

    } else if (UaInfo.isAndroid()) {
      // Android平台
      if (
        typeof window.JFNewClient === 'object' &&
        typeof window.JFNewClient.useSysCamera === 'function'
      ) {
        // 安卓新版本平台，接口存在
        console.log('Android new');
        const paramsNew = {
          type: cameraType,
          toastMsg: toastMsg,
          isCustom: cameraType === CAMERA_TYPE.CUSTOMER_CAMERA,
          isLocal: isCanSelect,
          idCardFace: idCardFaceType,
          success: (res) => { callBack(res.data) },
        };
        useSysCamera(paramsNew);
      } else if (typeof window.UploadImageHandler === 'object') {
        // 安卓老版本平台，接口对象存在
        console.log('Android old with object: UploadImageHandler');
        if (isCanSelect) {
          // 安卓老版本平台，可以选择
          console.log('Android old and is can select');

          if (typeof window.UploadImageHandler.requestImage === 'function') {
            // 安卓老版本平台下弹出 拍照|相册 选择框
            console.log('Android old with func: UploadImageHandler.requestImage, [camera] | [select]');
            window.UploadImageHandler.requestImage();
          } else {
            console.log('Android old [camera] | [select] is no setting!');
            alert('Android old [camera] | [select] is no setting!');
          }
        } else {
          // 安卓老版本平台，不可以选择
          // TODO: 此处不再兼容不可以传tips的android版本
          if (typeof window.UploadImageHandler.requestCamera === 'function') {
            if (toastMsg !== '') {
              console.log('Android old with func: UploadImageHandler.requestCamera, [camera + tips] & [no select]');
              window.UploadImageHandler.requestCamera(cameraType, 'uploadImageCallBack', toastMsg);
            } else {
              console.log('Android old with func: UploadImageHandler.requestCamera, [camera + no tips] & [no select]');
              window.UploadImageHandler.requestCamera(cameraType, 'uploadImageCallBack');
            }
          } else {
            console.log('Android old [camera] & [no select] is no setting!');
            alert('Android old [camera] & [no select] is no setting!');
          }
        }
      } else {
        console.log('Android is no contact, no new & no old');
        alert('Android is no contact, no new & no old');
      }
    } else {
      console.log('Its unknow phone!');
      alert('Its unknow phone!');
    }
  }
}

export const openJsCameraJF = (props) => {
  const { idFlag, isCanSelect, uploadBefore, localLoad, upload } = props;
  getImageInBase64({ uploadBefore: () => { uploadBefore(idFlag) }, isCanSelect })
    .then((imageUrl) => {
      localLoad(imageUrl, idFlag);
      upload(imageUrl, idFlag);
    });
};

// 暴露拍照上传接口
export default class UploadTools {
  constructor({
    localLoad = () => { },
    upload = () => { },
    uploadBefore = () => { },
    cameraType = CAMERA_TYPE.SYSTEM_CAMERA,
    tips = '',
    isCanSelect = false,
    idCardFaceType = ''
  }) {
    this.props = { localLoad, upload, uploadBefore, cameraType, tips, isCanSelect, idCardFaceType };
  }

  // 打开相机
  openCamera = (idFlag = 0) => {
    const { tips, cameraType, isCanSelect, idCardFaceType } = this.props;

    /*
     * sunline_App 下
     * Android 一定交互 (区分是否可以选择)
     * IOS iOS8以上仅拍照才交互
     * */

    if (
      !UaInfo.isApp() ||                       // 非app平台下，直接H5调用相机
      (isCanSelect && !UaInfo.isAndroid()) ||  // 非android平台下，可以选择，直接H5调用相机
      (!isCanSelect && UaInfo.isUnderIOS8())   // ios8系统下，不可选择，直接H5调用相机
    ) {
      // 直接通过H5调起相机
      openJsCameraJF({ ...this.props, idFlag });
    } else {
      // 不可以选择 && 高于iOS8(包含安卓)
      // 安卓可以选择
      // 定义回调
      this.setCallBack(idFlag);
      // 调用交互
      NativeCameraJF.open({ tips, cameraType, isCanSelect, idCardFaceType }, window.uploadImageCallBack);
    }
  };

  // 注册回调函数（Android下，写入window function）
  setCallBack = (idFlag) => {
    window.uploadImageCallBack = (str) => {
      console.log('success');
      this.props.uploadBefore(idFlag);

      // base64位转换
      const url = `data:image/jpeg;base64,${str}`;
      // 本地加载
      this.props.localLoad(url, idFlag);

      // 上传
      this.props.upload(url, idFlag);

    };
  };
}

