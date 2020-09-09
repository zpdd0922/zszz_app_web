/* eslint-disable */
// Disables all rules for the rest of the file
import userAgent from '@/main/utils/common/ua-info';
import { getURLParameters } from '@/modules/module-iaccount/utils/url';
import getImageInBase64 from './get-img-base64';

export const BASE64 = 'data:image/jpeg;base64,'

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
  static open({ tips, cameraType, isCanSelect, idCardFaceType, fail }, callBack) {

    const toastMsg = tips || '';

    if (userAgent.isIOS()) {
      const tipsInfo = toastMsg && toastMsg !== '' ? { tips: toastMsg } : {};
      const paramsIOS = {
        type: cameraType,
        idCardFace: idCardFaceType,
        ...tipsInfo,
      };
      console.log('open-IOS - params', paramsIOS)
      NativeCameraJF.setupWebViewJavascriptBridge((bridge) => {
        // js调用ios相机
        bridge.callHandler('getAppleCam', paramsIOS, (data) => {
          console.log('open-IOS - callHandler', data)
        });
        // ios调用js回调
        bridge.registerHandler('picUpload', (data, responseCallback) => {
          console.log('open-IOS - back', data)
          callBack(data.pic);
        });
      });

    } else if (userAgent.isAndroid()) {
      console.log('open-Android');
      // Android平台
      if (
        typeof window.JFNewClient === 'object' &&
        typeof window.JFNewClient.useSysCamera === 'function'
      ) {
        const paramsAndroid = {
          type: cameraType,
          toastMsg: toastMsg,
          // isCustom 是否自定义相机视图
          isCustom: cameraType === CAMERA_TYPE.CUSTOMER_CAMERA,
          // isLocal是否展示拍照及相册面板选择
          isLocal: isCanSelect,
          // 身份证正反面类型
          idCardFace: idCardFaceType,
          success: (res) => { callBack(res.data) },
          fail: (err, msg) => {
            console.log('Android - 调用相机交互失败', err, msg)
            fail(err, msg);
          },
          complete: (res) => { console.log('Android - 调用相机交互完成', res)  },
        };
        console.log('open-Android - params', paramsAndroid);
        // 调用桥通信
        window.JFSTOCK.useSysCamera(paramsAndroid);
      }
    } else {
      console.log('Its unknow phone!');
    }
  }
}

export const openJsCameraJF = (props) => {
  const { idFlag, isCanSelect, uploadBefore, localLoad, upload, fail } = props;
  getImageInBase64({ uploadBefore: () => {uploadBefore(idFlag)}, isCanSelect })
    .then((imageUrl) => {
      localLoad(imageUrl, idFlag);
      upload(imageUrl, idFlag);
    })
    .catch(err => {
      fail(err);
    });
};

// 玖富钱包APP
export const openWalletCamera = (props) => {
  const defaultWallet = {
    quality: 25,
    // 设置图片返回base64 string格式数据
    destinationType: Camera.DestinationType.DATA_URL,
    // CAMERA - 拍照  PHOTOLIBRARY - 相册
    sourceType: Camera.PictureSourceType.CAMERA,
  }
  const { idFlag, uploadBefore, localLoad, upload, fail, cameraParams = {} } = props;
  const params = Object.assign({}, defaultWallet, cameraParams)
  uploadBefore(idFlag)
  navigator.camera.getPicture((imageData) => {
    // base64位转换
    const url = `${BASE64}${imageData}`;
    localLoad(url, idFlag);
    upload(url, idFlag);
  }, (message) => {
    console.log('Failed because: ', message)
    fail(message);
  }, params)
}

// 玖富万卡APP
export const openWkCamera = (props) => {
  const { idFlag, fail, uploadBefore, localLoad, upload } = props;
  uploadBefore(idFlag)
  wk.getPicture({
    sourceType: 'CAMERA',
    destinationType: 'base64',
    maxSize: 500
  })
    .then((info) => {
      // 成功回调
      // info.imageData base64数据流
      const url = BASE64 + info.imageData
      console.log('url', url)
      localLoad(url, idFlag);
      upload(url, idFlag);
    })
    .catch((err) => {
      // 失败回调
      fail(err);
    })
}

// 暴露拍照上传接口
export default class UploadTools {
  constructor({
                localLoad = () => {},
                upload = () => {},
                uploadBefore = () => {},
                fail = () => { console.log('UploadTools => 图片拍照异常') },
                cameraType = CAMERA_TYPE.SYSTEM_CAMERA,
                tips = '',
                isCanSelect = false,
                idCardFaceType = ''
              }) {
    this.props = { localLoad, upload, uploadBefore, fail, cameraType, tips, isCanSelect, idCardFaceType };
  }

  // 打开相机
  openCamera = (idFlag = 0) => {
    const { isCanSelect } = this.props;

    /*
     * sunline_App 下
     * Android 一定交互 (区分是否可以选择)
     * IOS iOS8以上仅拍照才交互
     * */
    if (
      !userAgent.isApp() ||                       // 非app平台下，直接H5调用相机
      (isCanSelect && !userAgent.isAndroid()) ||  // 非android平台下，可以选择，直接H5调用相机
      (!isCanSelect && userAgent.isUnderIOS8())   // ios8系统下，不可选择，直接H5调用相机
    ) {
      // 直接通过H5调起相机
      openJsCameraJF({ ...this.props, idFlag });
      // if (userAgent.isWalletApp()) {
      //   // 钱包APP调用钱包交互方案
      //   openWalletCamera({ ...this.props, idFlag });
      // } else if (userAgent.isWkApp()) {
      //   // 万卡APP调用钱包交互方案
      //   openWkCamera({ ...this.props, idFlag });
      // } else {
      //   // 直接通过H5调起相机
      //   openJsCameraJF({ ...this.props, idFlag });
      // }
    } else {
      // 不可以选择 && 高于iOS8
      // 安卓可以选择
      // 定义回调
      this.setCallBack(idFlag);
      // 调用交互
      NativeCameraJF.open({ isCanSelect, ...this.props }, window.uploadImageCallBack);
    }
  };

  // 注册回调函数（Android下，写入window function）
  setCallBack = (idFlag) => {
    window.uploadImageCallBack = (str) => {
      console.log('uploadImageCallBack success');
      this.props.uploadBefore(idFlag);

      // base64位转换
      const url = `${BASE64}${str}`;

      // 本地加载
      this.props.localLoad(url, idFlag);

      // 上传
      this.props.upload(url, idFlag);

    };
  };
}

