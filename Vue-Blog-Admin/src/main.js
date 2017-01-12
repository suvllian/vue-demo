import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'


import App from './App'
import router from './route'

Vue.use(VueRouter);
Vue.use(VueResource);

new Vue(Vue.util.extend({ router }, App)).$mount('#app');

Vue.http.options.emulateJSON = true;