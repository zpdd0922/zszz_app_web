import Vue from 'vue';
// import FastClick from 'fastclick';
// import Cube from 'cube-ui';

import App from './App';
import router from './router/index.js';
// import store from './store';
// import i18n from './locale';

// 引入工具类
import UaInfo from '@/main/utils/common/ua-info';
// import Cookie from '@/main/utils/cache/cookie';
import Storage from '@/main/utils/cache/localstorage';

import BroadCast, { BROADCAST_ENUMS } from '@/main/utils/common/broadcast';
// import CustomToast from '@/main/components/custom-toast/index.vue'
// import CustomAlert from '@/main/components/custom-alert/index.vue'

import ApiHelpCenter from './api/index';

// 引入项目公共功能
import '@/main/utils/common/rem';
// import '@/main/utils/common/v-console.js';

import './components/register';

require('./css/theme-default.scss');


Vue.prototype.UaInfo = UaInfo;
Vue.prototype.Storage = Storage;
Vue.prototype.BroadCast = BroadCast;
Vue.prototype.BROADCAST_ENUMS = BROADCAST_ENUMS;
Vue.prototype.ApiHelpCenter = ApiHelpCenter;

Vue.component('ComWaiting', () => import('@/main/components/base-waiting/waiting'));

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
