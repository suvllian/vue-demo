import VueRouter from 'vue-router';

import Home from './components/home/index';
import Article from './components/article/index';

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/article/:id', component: Article },
	{ path: '*', component: Home }
  ]
});

export default router;