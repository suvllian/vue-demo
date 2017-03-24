import api from './../../api';
import { GET_JOIN_INFO, DELETE_JOIN_PERSON } from './../type';

export default {
	state: {
		joins:[]
	},

	mutations: {
		[GET_JOIN_INFO](state, action) {
			state.joins = action.data;
		},
		[DELETE_JOIN_PERSON](state, action) {
			if (action.data == 1) {
				state.joins.splice(action.index, 1);
			}
		}	
	},

	actions: {
		[GET_JOIN_INFO]({ commit }) {
			api.getJoin().then(res => {	
				commit(GET_JOIN_INFO,{
					data: res.data
				})
			}).catch(err => {

			})
		},
		[DELETE_JOIN_PERSON]({ commit }, condition) {
			api.deletePerson(condition.id).then(res => {	
				commit(DELETE_JOIN_PERSON,{
					data: res.data,
					index: condition.index
				})
			}).catch(err => {

			})
		}
	}
}