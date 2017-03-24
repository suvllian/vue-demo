import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import App from './App'
import router from './route'
import store from './vuex/store'

Vue.use(VueRouter);

new Vue(Vue.util.extend({ router, store }, App)).$mount('#app');