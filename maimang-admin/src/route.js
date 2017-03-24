import VueRouter from 'vue-router';

import Home from './components/home/index';
import Album from './components/album/index';
import Hot from './components/hot/index';
import Email from './components/email/index';
import Join from './components/join/index';
import Teachers from './components/teachers/index';

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Home },

    { path: '/index', component: Home },
    { path: '/album', component: Album },
    { path: '/hot', component: Hot },
    { path: '/email', component: Email },
    { path: '/join', component: Join },
    { path: '/teacher', component: Teachers },

	{ path: '*', component: Home }
  ]
});

export default router;