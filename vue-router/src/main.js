// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App';
import Hello from './components/Hello.vue';
import Second from './components/Second.vue';

Vue.use(VueRouter)
Vue.config.devtools = true;
/* eslint-disable no-new */
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Hello },
    { path: '/Hello', component: Hello },
    { path: '/Second', component: Second },
  ]
})

new Vue(Vue.util.extend({ router }, App)).$mount('#app')
