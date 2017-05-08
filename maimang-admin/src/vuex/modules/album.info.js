import api from './../../api';
import { GET_ALBUM_INFO, SET_ALBUM_IMAGE_INDEX, UPLOAD_ALBUM_IMAGE,
		 UPLOAD_ALBUM_IMAGE_SUCCESS, UPLOAD_ALBUM_IMAGE_FAIL,
		 CHANGE_ALBUM_INFO, CHANGE_ALBUM_INFO_SUCCESS, 
		 SUBMIT_ALBUM_INFO, CHANGE_ALBUM_INFO_FAIL} from './../type';

export default {
	state: {
		albums: [],
		index: 0,
		id: 0,
		isUploading: false,
		success: true,
		isChanging: false,
		changeSuccess: true,
		item: {}
	},

	mutations: {
		// 得到首屏所有图片信息
		[GET_ALBUM_INFO](state, action) {
			state.albums = action.data;
		},

		// 设置被点击图片索引及ID
		[SET_ALBUM_IMAGE_INDEX](state, action) {
			state.index = action.index;
			state.id = action.id;
			state.isUploading = action.isUploading;
		},

		// 上传图片成功
		[UPLOAD_ALBUM_IMAGE_SUCCESS](state, action) {
			state.albums[state.index].imgsrc = action.name;
			state.index = 0;
			state.success = true;
			state.isUploading = false;
		},

		// 上传图片失败
		[UPLOAD_ALBUM_IMAGE_FAIL](state, action) {
			state.success = false;
			state.isUploading = true;
		},

		// isChanging值为true时，出现修改栏，传入相应内容。
		// 值为false时，隐藏修改栏。
		[CHANGE_ALBUM_INFO](state, action) {
			state.isChanging = action.isChanging;
			state.item = state.albums[action.index];
			state.id = action.id;
			state.index = action.index;
		},

		// 修改成功
		[CHANGE_ALBUM_INFO_SUCCESS](state, action) {
			state.isChanging = false;
			state.changeSuccess = true;
		},

		// 修改失败
		[CHANGE_ALBUM_INFO_FAIL](state, action) {
			state.isChanging = true;
			state.changeSuccess = false;
		},
	},

	actions: {
		// 得到首屏所有图片信息
		[GET_ALBUM_INFO]({ commit }) {
			api.getAlbum().then(res => {	
				commit(GET_ALBUM_INFO,{
					data: res.data
				})
			}).catch(err => {

			})
		},

		// 点击图片，设置被点击图片的索引，显示或隐藏
		[SET_ALBUM_IMAGE_INDEX]({ commit }, item) {
			commit(SET_ALBUM_IMAGE_INDEX,{
				index: item.index,
				id: item.id,
				isUploading: item.isUploading,
			})
		},

		// 点击修改按钮，出现修改栏
		[CHANGE_ALBUM_INFO]({ commit }, item) {
			commit(CHANGE_ALBUM_INFO,{
				index: item.index,
				id: item.id,
				isChanging: item.isChanging
			})
		},

		// 提交修改的内容
		[SUBMIT_ALBUM_INFO]({ commit }, item) {
			api.changeAlbum(item.id, item.intro, item.src).then(res => {
				if (res.data == 1){
					commit(CHANGE_ALBUM_INFO_SUCCESS);
				} else{
					commit(CHANGE_ALBUM_INFO_FAIL);
				}   
			}).catch(err => {
			    commit(CHANGE_ALBUM_INFO_FAIL);
			});
		},

		// 上传图片
		[UPLOAD_ALBUM_IMAGE]({ commit }, file) {
			let fileReader = new FileReader();
			fileReader.readAsDataURL(file.data);

			let time = Date.now();
			let fileName = 'album-' + file.id + time;
			
			fileReader.onload = e => {
				api.uploadImage(e.target.result, fileName, file.id, "content" ).then(res => {
					if (res.data != 0){
						commit(UPLOAD_ALBUM_IMAGE_SUCCESS, {
							name: res.data
						});
					} else{
						commit(UPLOAD_ALBUM_IMAGE_FAIL);
					}   
				}).catch(err => {
				    commit(UPLOAD_ALBUM_IMAGE_FAIL);
				});
			}
		}
	}
}