import VueRouter from 'vue-router';

import TImage from './components/Travel/Image';
import TView from './components/Travel/View';

import Book from './components/Book/Index';
import BView from './components/Book/View';

import Article from './components/Article/Index';
import AView from './components/Article/View';

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: TImage },

    { path: '/tImage', component: TImage },
    { path: '/tView', component: TView },

    { path: '/bIndex', component: Book },
    { path: '/bView', component: BView },

    { path: '/aIndex', component: Article },
    { path: '/aView', component: AView },	

	{ path: '*', component: TImage }
  ]
});

export default router;