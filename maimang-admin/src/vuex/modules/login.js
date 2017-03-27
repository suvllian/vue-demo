import api from './../../api';
import { ADMIN_LOGIN, ADMIN_LOGIN_SUCCESS, ADMIN_LOGIN_FAIL } from './../type';

export default {
	state: {
		form:{name:"", pass:""},
		userInfo:{}
	},

	mutations: {
		[ADMIN_LOGIN_SUCCESS](state, action) {
			state.userInfo = {admin:"maimang"}
		},
		[ADMIN_LOGIN_FAIL](state, action) {
			
		}
	},

	actions: {
		[ADMIN_LOGIN]({ commit }, form) {
			api.login(form.name, form.pass).then(res => {	
				let result = res.data;
				if (result){
					if (result.name === "success") {
						commit(ADMIN_LOGIN_SUCCESS);
					} else{
						commit(ADMIN_LOGIN_FAIL);
					}
				}
			}).catch(err => {
				commit(ADMIN_LOGIN_FAIL);
			})
		}
	}
}