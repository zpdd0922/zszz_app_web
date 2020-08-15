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

const store = {
  state: {},
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    viewLoad: viewLoadModules,
  },
  plugins: [...commonPlugins]
};

Vue.use(Vuex);

export default new Vuex.Store(store);
