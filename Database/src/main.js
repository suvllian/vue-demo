import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import App from './App'
import router from './routes'

Vue.use(VueRouter);
Vue.use(Vuex);
new Vue(Vue.util.extend({ router }, App)).$mount('#app');