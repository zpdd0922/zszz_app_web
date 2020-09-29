import Vue from 'vue';
import FastClick from 'fastclick';
import Cube from 'cube-ui';

import App from './App';
import router from './router';  
import i18n from './locale';

// 引入工具类
import UaInfo from '@/main/utils/common/ua-info';

import BroadCast, { BROADCAST_ENUMS } from '@/main/utils/common/broadcast';
import CustomToast from '@/main/components/custom-toast/index.vue'
import CustomAlert from '@/main/components/custom-alert/index.vue'

// 引入项目公共功能
import setTitle from '@/main/utils/common/set-title';
import '@/main/utils/common/rem';
import '@/main/utils/common/v-console.js';

// 引入路由控制
import './router/permission';

// 引入样式
require('./assets/styles/theme-white.scss');

const CUSTOMIZE_GLOBAL_DEFINE = JSON.parse(process.env.VUE_APP_CUSTOMIZE_GLOBAL_DEFINE);

Vue.prototype.UaInfo = UaInfo;
Vue.prototype.Storage = Storage;
Vue.prototype.Cookie = Cookie;
Vue.prototype.setTitle = setTitle;
Vue.prototype.BroadCast = BroadCast;
Vue.prototype.BROADCAST_ENUMS = BROADCAST_ENUMS;
Vue.prototype.CUSTOMIZE_GLOBAL_DEFINE = CUSTOMIZE_GLOBAL_DEFINE;


Cube.createAPI(Vue, CustomToast, ['timeout'], true)
Cube.createAPI(Vue, CustomAlert, ['confirm'], true)
Cube.createAPI(Vue, JfDialog, ['onConfirm'], true)
Vue.use(Cube);

FastClick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  //   template: '<App/>'
}).$mount('#app');