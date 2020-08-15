import Vue from 'vue';
import App from './App';
import {
  i18n
} from '../../locale';
import uaInfo from '@/main/utils/common/ua-info';
import '@/common/v-console.js';
import '@/common/rem.js';

if (process.env.NODE_ENV !== 'production') {
  require('../../css/theme-white.scss');
}

Vue.prototype.uaInfo = uaInfo;

/* eslint-disable no-new */
new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app');
