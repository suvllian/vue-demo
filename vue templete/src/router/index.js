import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hello',
      component: HelloWorld
    }
  ]
})
