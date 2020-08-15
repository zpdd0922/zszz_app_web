import Vue from 'vue';
import Cube from 'cube-ui';
import BaseOpenApp from '@/main/components/base-open-app/index.vue'
import UaInfo from '@/main/utils/common/ua-info';

const vm = new Vue();
Cube.createAPI(Vue, BaseOpenApp, ['error', 'success'], true)

const openAppTool = ({ node, url, error, success }) => {
  const openAppTool = vm.$createBaseOpenApp({
    node,
    url,
    onError: () => {
      error && error();
    },
    onSuccess: () => {
      success && success();
    }
  });
  openAppTool.open();
};


// 是否为Android下的chrome浏览器，排除mobileQQ；
// Android下的chrome，需要通过特殊的intent 来唤醒
// refer link：https://developer.chrome.com/multidevice/android/intents
function isAndroidChrome() {
  console.log('isQQ', UA.isChrome() && UA.isAndroid() && !UA.isMobileQQ())
  return UA.isChrome() && UA.isAndroid() && !UA.isMobileQQ();
}

export class OpenApp {
  constructor({ iosConfig, androidConfig }) {
    this.iosConfig = iosConfig;
    this.androidConfig = androidConfig;
  }

  /**
   * [generateSchema 根据不同的场景及UA生成最终应用的schema]
   * @return {[type]} [description]
   */
  // android schema
  generateAndroidSchema = () => {
    const config = this.androidConfig;
    // 如果是安卓chrome浏览器，则通过intent方式打开
    let schemaStr = '';

    if (isAndroidChrome()) {
      schemaStr = `intent://${config.intentUrl}#Intent;` +
        `scheme=${config.scheme};` +
        `package=${config.apkInfo.package};` +
        `category=${config.apkInfo.category};` +
        `action=${config.apkInfo.action};` +
        `S.browser_fallback_url=${encodeURIComponent(config.downloadUrl)};` +
        'end';
    } else {
      schemaStr = `${config.scheme}://${config.intentUrl}`;
    }

    return schemaStr;
  };

  // ios schema
  generateIOSSchema = () => this.iosConfig.scheme;

  openIOS = () => {
    // ios下，使用a标签
    const url = this.generateIOSSchema();
    openAppTool({ node: "a", url })
  };

  openAndroid = () => {
    // android下，分开处理
    if (isAndroidChrome()) {
      // Android Chrome, 使用a标签
      const url = this.generateAndroidSchema();
      openAppTool({ node: "a", url })

    } else {
      // 其他浏览器
      // 适用：UC, SouGou, firefox, mobileQQ
      const url = this.generateAndroidSchema();
      openAppTool({ node: "iframe", url })
    }
  };

  openWeiXin = () => {
    const url = UA.isAndroid ? this.androidConfig.downloadUrl : this.iosConfig.downloadUrl;
    openAppTool({ type: "a", url })
  }

  loadSchema = () => {
    if (UA.isIOS()) {
      console.log('is Ios');
      if (UA.isWX()) {
        // 屏蔽微信下
        console.log('微信平台');
        this.openWeiXin();
      } else {
        this.openIOS();
      }
    } else if (UA.isAndroid()) {
      if (UA.isWX() || UA.isMobileQQ()) {
        console.log('微信平台');
        this.openWeiXin();
      } else {
        this.openAndroid();
      }
    } else {
      // 未知平台
      console.log('其他非微信平台');
    }
  }
}
