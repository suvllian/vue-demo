import VueRouter from 'vue-router';

import Login from './components/login/index';
import Home from './components/home/use';
import Album from './components/album/index';
import Hot from './components/hot/index';
import Email from './components/email/index';
import Join from './components/join/index';
import Teachers from './components/teachers/index';
import ClassBlock from './components/class/index';
import Person from './components/person/index';
import Page from './components/page/index';
import PageView from './components/page/view';

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Login },

    { path: '/index', component: Home },
    { path: '/album', component: Album },
    { path: '/hot', component: Hot },
    { path: '/email', component: Email },
    { path: '/join', component: Join },
    { path: '/teacher', component: Teachers },
    { path: '/login', component: Login },
    { path: '/class', component: ClassBlock },
    { path: '/person', component: Person },
    { path: '/page', component: Page },
    { path: '/pageview', component: PageView },

	  { path: '*', component: Login }
  ]
});

export default router;