import api from './../../api';
import { GET_TEACHERS_INFO } from './../type';

export default {
	state: {
		teachers:[]
	},

	mutations: {
		[GET_TEACHERS_INFO](state, action) {
			state.teachers = action.data;
		}
	},

	actions: {
		[GET_TEACHERS_INFO]({ commit }) {
			api.getTeacher().then(res => {	
				commit(GET_TEACHERS_INFO,{
					data: res.data
				})
			}).catch(err => {

			})
		}
	}
}