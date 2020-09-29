import Vue from 'vue';
import FastClick from 'fastclick';
import Cube from 'cube-ui';

import App from './App';
import router from './router';
import store from './store';
import i18n from './locale';

// 引入工具类
import UaInfo from '@/main/utils/common/ua-info';
import Cookie from '@/main/utils/cache/cookie';
import Storage from '@/main/utils/cache/localstorage';

import BroadCast, { BROADCAST_ENUMS } from '@/main/utils/common/broadcast';
import CustomToast from '@/main/components/custom-toast/index.vue'
import CustomAlert from '@/main/components/custom-alert/index.vue'

// 引入项目公共功能
import setTitle from '@/main/utils/common/set-title';
import '@/main/utils/common/rem';
import '@/main/utils/common/v-console.js';

// 引入路由控制
import './router/permission';

// 引入公共組件
import { BaseFormGroup, BaseFormItem } from '@/main/components/base-forms';
import { BaseCells, BaseCell, BaseCellHeader, BaseCellBody, BaseCellFooter } from '@/main/components/base-cell';

// 引入項目組件
import '@/modules/module-iopen-extension/components/register';

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

Vue.use(Cube);

FastClick.attach(document.body);

Vue.component('CountryList', () => import('@/main/components/country-list'));
Vue.component('BaseWaiting', () => import('@/main/components/base-waiting/waiting3'));
Vue.component('BaseFormGroup', BaseFormGroup);
Vue.component('BaseFormItem', BaseFormItem);

Vue.component('BaseCells', BaseCells);
Vue.component('BaseCell', BaseCell);
Vue.component('BaseCellHeader', BaseCellHeader);
Vue.component('BaseCellBody', BaseCellBody);
Vue.component('BaseCellFooter', BaseCellFooter);

/* eslint-disable no-new */
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  //   template: '<App/>'
}).$mount('#app');
