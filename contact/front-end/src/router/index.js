import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Edit from '@/pages/edit'
import List from '@/pages/list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: '/list',
      name: 'list',
      component: List
    }
  ]
})
