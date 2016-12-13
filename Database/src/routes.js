import VueRouter from 'vue-router';

import Main from './components/Login/index.vue';
import Staff from './components/Staff/index.vue';
import Manager from './components/Manager/index.vue';
import Mister from './components/Mister/index.vue';

import Smain from './components/Staff/Main.vue';
import Schange from './components/Staff/Change.vue';

import Mmain from './components/Manager/Main.vue';
import Mall from './components/Manager/All.vue';
import Madd from './components/Manager/Add.vue';

import MImain from './components/Mister/Main.vue';
import MIall from './components/Mister/All.vue';


const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Main },

    { path: '/staff/', component: Staff ,
	  children:[
	  	{path: '', component: Smain},
	  	{path: 'home', component: Smain},
	  	{path: 'change', component: Schange},	 
	  ]
	},

   	{ path: '/mister/', component: Mister ,
   	  children:[
	  	{path: '', component: MImain},
	  	{path: 'home', component: MImain},
	  	{path: 'all', component: MIall},
	  	{path: 'add', component: Madd},	 	 
	  ]
	},

   	{ path: '/manager/', component: Manager ,
      children:[
	  	{path: '', component: Mmain},
	  	{path: 'home', component: Mmain},	 
	  	{path: 'all', component: Mall},	 
	  	{path: 'add', component: Madd},	 
	  ]
	},

	{ path: '*', component: Main }
  ]
});

export default router;