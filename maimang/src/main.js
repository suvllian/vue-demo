import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

import router from './route'

Vue.use(VueRouter);

new Vue(Vue.util.extend({ router }, App)).$mount('#app');