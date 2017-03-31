import api from './../../api';
import { GET_HOT_INFO, SET_HOT_IMAGE_INDEX, UPLOAD_HOT_IMAGE, 
		UPLOAD_HOT_IMAGE_SUCCESS, UPLOAD_HOT_IMAGE_FAIL, CHANGE_HOT_INFO_SUCCESS,
		CHANGE_HOT_INFO_FAIL, CHANGE_HOT_INFO, SUBMIT_HOT_INFO } from './../type';

export default {
	state: {
		hots:[],
		index:0,
		success: true,
		isChange: false,
		changeSuccess:true,
		item: {}
	},

	mutations: {
		// 得到热门课程信息
		[GET_HOT_INFO](state, action) {
			state.hots = action.data;
		},

		// 设置被点击图片的索引，显示或隐藏
		[SET_HOT_IMAGE_INDEX](state, action) {
			state.index = action.index;
		},

		// 上传图片成功
		[UPLOAD_HOT_IMAGE_SUCCESS](state, action) {
			state.index = 0;
			state.success = true;
		},

		// 上传图片失败
		[UPLOAD_HOT_IMAGE_FAIL](state, action) {
			state.success = false;
		},

		// isChange值为true时，出现修改栏，传入相应内容。
		// 值为false时，隐藏修改栏。
		[CHANGE_HOT_INFO](state, action) {
			state.isChange = action.isChange;
			state.item = state.hots[action.index];
			state.item.index = action.index;
		},

		// 修改成功
		[CHANGE_HOT_INFO_SUCCESS](state, action) {
			state.isChange = false;
			state.changeSuccess = true;
		},

		// 修改失败
		[CHANGE_HOT_INFO_FAIL](state, action) {
			state.isChange = true;
			state.changeSuccess = false;
		},
	},

	actions: {
		// 获取热点课程所有信息
		[GET_HOT_INFO]({ commit }) {
			api.getHot().then(res => {	
				commit(GET_HOT_INFO,{
					data: res.data
				})
			}).catch(err => {

			})
		},

		// 设置被点击图片索引
		[SET_HOT_IMAGE_INDEX]({ commit }, index) {
			commit(SET_HOT_IMAGE_INDEX,{
				index: index
			})
		},

		// 点击修改按钮，出现修改栏
		[CHANGE_HOT_INFO]({ commit }, change) {
			commit(CHANGE_HOT_INFO,{
				index: change.index,
				isChange: change.isChange
			})
		},

		// 提交修改的内容
		[SUBMIT_HOT_INFO]({ commit }, item) {
			api.changeAlbum(item.cId, "", item.src).then(res => {
				if (res.data == 1){
					commit(CHANGE_HOT_INFO_SUCCESS);
				} else{
					commit(CHANGE_HOT_INFO_FAIL);
				}   
			}).catch(err => {
			    commit(CHANGE_HOT_INFO_FAIL);
			});
		},

		// 上传图片
		[UPLOAD_HOT_IMAGE]({ commit }, file) {
			let fileReader = new FileReader();
			fileReader.readAsDataURL(file.data);
			let fileName = 'hot-img-' + file.index;
			fileReader.onload = e => {
				api.uploadImage(e.target.result, fileName).then(res => {
					if (res.data == 1){
						commit(UPLOAD_HOT_IMAGE_SUCCESS);
					} else{
						commit(UPLOAD_HOT_IMAGE_FAIL);
					}   
				}).catch(err => {
				    commit(UPLOAD_HOT_IMAGE_FAIL);
				});
			}
		},
	}
}