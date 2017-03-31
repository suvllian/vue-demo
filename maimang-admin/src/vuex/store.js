import Vue from 'vue'
import Vuex from 'vuex'

import albumInfo from './modules/album.info.js';
import HotInfo from './modules/hot.info.js';
import TeachersInfo from './modules/teachers.info.js';
import EmailInfo from './modules/email.info.js';
import JoinInfo from './modules/join.info.js';
import Login from './modules/login.js';
import ClassInfo from './modules/class.info.js';
import PersonInfo from './modules/person.info.js';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		albumInfo,
		HotInfo,
		TeachersInfo,
		EmailInfo,
		JoinInfo,
		Login,
		ClassInfo,
		PersonInfo
	}
})