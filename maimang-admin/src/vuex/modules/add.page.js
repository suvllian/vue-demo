import api from './../../api';
import { ADD_ARTICLE, ADD_ARTICLE_SUCCESS, ADD_ARTICLE_FAIL } from './../type';

export default {
	state: {
		addSuccess: false,
	},

	mutations: {
		[ADD_ARTICLE_SUCCESS](state, action) {
			state.addSuccess = true;
			alert("添加成功");
		},
		[ADD_ARTICLE_FAIL](state, action) {
			state.addSuccess = false;
			alert("添加失败");
		}
	},

	actions: {
		[ADD_ARTICLE]({ commit }, article) {
			api.addArticle(article.title, article.content).then(res => {	
				if (res.data == 1) {
					commit(ADD_ARTICLE_SUCCESS,{});
				} else {
					commit(ADD_ARTICLE_SUCCESS,{});
				}
				
			}).catch(err => {
				commit(ADD_ARTICLE_FAIL,{});
			})
		}
	}
}