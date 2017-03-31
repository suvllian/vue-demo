import api from './../../api';
import { GET_CLASS_INFO, CHANGE_CLASS_INFO,
		CHANGE_CLASS_INFO_SUCCESS, CHANGE_CLASS_INFO_FAIL, SUBMIT_CLASS_INFO } from './../type';

export default {
	state: {
		classInfo:[],
		isChange: false,
		changeSuccess:true,
		item: {}
	},

	mutations: {
		// 得到首屏所有图片信息
		[GET_CLASS_INFO](state, action) {
			state.classInfo = action.data;
		},

		// isChange值为true时，出现修改栏，传入相应内容。
		// 值为false时，隐藏修改栏。
		[CHANGE_CLASS_INFO](state, action) {
			state.isChange = action.isChange;
			state.item = state.classInfo[action.index];
		},

		// 修改成功
		[CHANGE_CLASS_INFO_SUCCESS](state, action) {
			state.isChange = false;
			state.changeSuccess = true;
		},

		// 修改失败
		[CHANGE_CLASS_INFO_FAIL](state, action) {
			state.isChange = true;
			state.changeSuccess = false;
		},
	},

	actions: {
		// 得到首屏所有图片信息
		[GET_CLASS_INFO]({ commit }) {
			api.getClasses().then(res => {	
				commit(GET_CLASS_INFO,{
					data: res.data
				})
			}).catch(err => {

			})
		},

		// 点击修改按钮，出现修改栏
		[CHANGE_CLASS_INFO]({ commit }, change) {
			commit(CHANGE_CLASS_INFO,{
				index: change.index,
				isChange: change.isChange
			})
		},

		// 提交修改的内容
		[SUBMIT_CLASS_INFO]({ commit }, item) {
			api.changeClasses(item.id, item.name, item.src).then(res => {
				if (res.data == 1){
					commit(CHANGE_CLASS_INFO_SUCCESS);
				} else{
					commit(CHANGE_CLASS_INFO_FAIL);
				}   
			}).catch(err => {
			    commit(CHANGE_CLASS_INFO_FAIL);
			});
		}
	}
}