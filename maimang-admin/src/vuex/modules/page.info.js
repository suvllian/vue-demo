import api from './../../api';
import { GET_ARTICLE_INFO, GET_ARTICLE_INFO_SUCCESS, GET_ARTICLE_INFO_FAIL, DELETE_ARTICLE } from './../type';

export default {
	state: {
		articles: []
	},

	mutations: {
		[GET_ARTICLE_INFO_SUCCESS](state, action) {
			state.articles = action.data;
		},
		[GET_ARTICLE_INFO_FAIL](state, action) {
			state.articles = [];
		},
		[DELETE_ARTICLE](state, action) {
			if (action.data == 1) {
				state.articles.splice(action.index, 1);
			}
		},
	},

	actions: {
		[GET_ARTICLE_INFO]({ commit }) {
			api.getInfor("article").then(res => {	
				commit(GET_ARTICLE_INFO_SUCCESS,{
					data: res.data
				});
			}).catch(err => {
				commit(GET_ARTICLE_INFO_FAIL,{});
			})
		},
		[DELETE_ARTICLE]({ commit }, condition) {
			api.deleteItem(condition.id, "article").then(res => {	
				commit(DELETE_ARTICLE,{
					data: res.data,
					index: condition.index
				})
			}).catch(err => {

			})
		}
	}
}