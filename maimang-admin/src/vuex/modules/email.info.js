import api from './../../api';
import { GET_EMAIL_INFO, DELETE_EMAIL } from './../type';

export default {
	state: {
		email:[]
	},

	mutations: {
		[GET_EMAIL_INFO](state, action) {
			state.email = action.data;
		},
		[DELETE_EMAIL](state, action) {
			if (action.data == 1) {
				state.email.splice(action.index, 1);
			}
		},
	},

	actions: {
		[GET_EMAIL_INFO]({ commit }) {
			api.getEmail().then(res => {	
				commit(GET_EMAIL_INFO,{
					data: res.data
				})
			}).catch(err => {

			})
		},
		[DELETE_EMAIL]({ commit }, condition) {
			api.deleteEmail(condition.id).then(res => {	
				commit(DELETE_EMAIL,{
					data: res.data,
					index: condition.index
				})
			}).catch(err => {

			})
		}
	}
}