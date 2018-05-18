/*
* @Author: Administrator
* @Date:   2018-01-29 10:18:28
* @Last Modified by:   Administrator
* @Last Modified time: 2018-03-10 09:47:05
*/
import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    location: 'http://192.168.1.152:12331/api/',
    TenantId: '1',
    activeName: 'first',
    propaganda: false,
    firstrouter: true,
    secondrouter: true,
    thirdrouter: true,
  },
  mutations: {
    add(state,command) {
      state.activeName = command;
    },
    propagandaCtrl(state,val) {
      state.propaganda = val;
    },
    firstrouterCtrl(state,val) {
      state.firstrouter = val;
    },
    secondrouterCtrl(state,val) {
      state.secondrouter = val;
    },
    thirdrouterCtrl(state,val) {
      state.thirdrouter = val;
    },
  }
})