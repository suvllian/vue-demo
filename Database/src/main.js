import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import App from './App'
import router from './routes'

import user from './vuex/user'

Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user
    }
})


new Vue(Vue.util.extend({ store,router }, App)).$mount('#app');
