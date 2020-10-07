import Vue from 'vue'
import Vuex from 'vuex'

import viewLoadModules from '@/main/store/modules/view-load';
import commonPlugins from '@/main/store/plugins';

import userModules from '@/modules/module-sign/store/user/';

// 自动从modules文件读取模块
import modules from './modules'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    viewLoad: viewLoadModules,
    ...modules,
    user: userModules,
  },
  plugins: [...commonPlugins],
  strict: debug
})
