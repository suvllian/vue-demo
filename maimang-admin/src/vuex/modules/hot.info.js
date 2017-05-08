import api from './../../api';
import { GET_HOT_INFO, SET_HOT_IMAGE_INDEX, UPLOAD_HOT_IMAGE, 
		UPLOAD_HOT_IMAGE_SUCCESS, UPLOAD_HOT_IMAGE_FAIL, CHANGE_HOT_INFO_SUCCESS,
		CHANGE_HOT_INFO_FAIL, CHANGE_HOT_INFO, SUBMIT_HOT_INFO } from './../type';

export default {
	state: {
		hots: [],
		index: 0,
		id: 0,
		isUploading: false,
		uploadSuccess: true,
		isChanging: false,
		changeSuccess: true,
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
			state.id = action.id;
			state.isUploading = action.isUploading;
		},

		// 上传图片成功
		[UPLOAD_HOT_IMAGE_SUCCESS](state, action) {
			state.hots[state.index].imgsrc = action.name;
			state.index = 0;
			state.uploadSuccess = true;
			state.isUploading = false;
		},

		// 上传图片失败
		[UPLOAD_HOT_IMAGE_FAIL](state, action) {
			state.uploadSuccess = false;
			state.isUploading = true;
		},

		// isChanging值为true时，出现修改栏，传入相应内容。
		// 值为false时，隐藏修改栏。
		[CHANGE_HOT_INFO](state, action) {
			state.isChanging = action.isChanging;
			state.item = state.hots[action.index];
			state.id = action.id;
			state.index = action.index;
		},

		// 修改成功
		[CHANGE_HOT_INFO_SUCCESS](state, action) {
			state.isChanging = false;
			state.changeSuccess = true;
		},

		// 修改失败
		[CHANGE_HOT_INFO_FAIL](state, action) {
			state.isChanging = true;
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
		[SET_HOT_IMAGE_INDEX]({ commit }, item) {
			commit(SET_HOT_IMAGE_INDEX,{
				index: item.index,
				id: item.id,
				isUploading: item.isUploading
			})
		},

		// 点击修改按钮，出现修改栏
		[CHANGE_HOT_INFO]({ commit }, item) {
			commit(CHANGE_HOT_INFO,{
				index: item.index,
				id: item.id,
				isChanging: item.isChanging
			})
		},

		// 提交修改的内容
		[SUBMIT_HOT_INFO]({ commit }, item) {
			api.changeAlbum(item.id, "", item.src).then(res => {
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
			let time = Date.now();
			let fileName = 'hot-img-' + file.id + time;
			fileReader.onload = e => {
				api.uploadImage(e.target.result, fileName, file.id, "content").then(res => {
					if (res.data != 0){
						commit(UPLOAD_HOT_IMAGE_SUCCESS, {
							name: res.data
						})
					} else{
						commit(UPLOAD_HOT_IMAGE_FAIL)
					}   
				}).catch(err => {
				    commit(UPLOAD_HOT_IMAGE_FAIL)
				});
			}
		},
	}
}