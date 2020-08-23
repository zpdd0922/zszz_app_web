/*
 * @Author: Jim
 * @Date: 2019-12-17 11:32:00
 * @LastEditors: Jim
 * @LastEditTime: 2019-12-17 11:53:26
 * @Description:
 */
import Vue from 'vue';
import Vuex from 'vuex';

import viewLoadModules from '@/main/store/modules/view-load';
import commonPlugins from '@/main/store/plugins';

import userModules from '@/modules/module-sign-icrm/store/user/';
import openCommonModules from '@/modules/module-iopen/store/common';
import openCNModules from '@/modules/module-iopen/store/open-cn';
import openHKModules from '@/modules/module-iopen/store/open-hk';

const store = {
  state: {},
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    viewLoad: viewLoadModules,
    user: userModules,
    // quotas: quotasModules,
    openCommon: openCommonModules,
    openCN: openCNModules,
    openHK: openHKModules
  },
  plugins: [...commonPlugins]
};

Vue.use(Vuex);

export default new Vuex.Store(store);
