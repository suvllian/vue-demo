import api from './../../api';
import { GET_TEACHERS_INFO, SET_TEACHERS_INDEX, UPLOAD_TEACHERS_IAMGE,
		UPLOAD_TEACHERS_IAMGE_SUCCESS, UPLOAD_TEACHERS_IAMGE_FAIL, CHANGE_TEACHERS_INFO,
		CHANGE_TEACHERS_INFO_SUCCESS, CHANGE_TEACHERS_INFO_FAIL, DELETE_TEACHERS_INTO,
		SUBMIT_TEACHERS_INFO, ADD_TEACHERS_INFO, ADD_TEACHERS_INFO_SUCCESS,
		ADD_TEACHERS_INFO_FAIL, SUBMIT_ADD_TEACHERS_INFO } from './../type';

export default {
	state: {
		teachers: [],
		index: 0,
		id: 0,
		isUploading: false,
		className: "teacher",
		success: true,
		isChange: false,
		changeSuccess:true,
		item: {},
		isAdd: false,
		addSuccess: true,
		addItem: {},
		newId: 0
	},

	mutations: {
		[GET_TEACHERS_INFO](state, action) {
			state.teachers = action.data;
		},

		// 设置被点击图片索引, 然后根据索引替换相应的图片
		[SET_TEACHERS_INDEX](state, action) {
			state.id = action.id;
			state.index = action.index;
			state.isUploading = action.isUploading;
			state.className = action.className;
		},

		// 上传图片成功
		[UPLOAD_TEACHERS_IAMGE_SUCCESS](state, action) {
			state.isUploading = false;
			state.success = true;
			if (state.className == "imgsrc") {
				state.teachers[state.index].imgsrc = action.name;
			} else {
				state.teachers[state.index].smallsrc = action.name;
			}
		},

		// 上传图片失败
		[UPLOAD_TEACHERS_IAMGE_FAIL](state, action) {
			state.isUploading = true;
			state.success = false;
		},

		// isChange值为true时，出现修改栏，传入相应内容。
		// 值为false时，隐藏修改栏。
		[CHANGE_TEACHERS_INFO](state, action) {
			state.isChange = action.isChange;
			state.item = state.teachers[action.index];
		},

		// 修改成功
		[CHANGE_TEACHERS_INFO_SUCCESS](state, action) {
			state.isChange = false;
			state.changeSuccess = true;
		},

		// 修改失败
		[CHANGE_TEACHERS_INFO_FAIL](state, action) {
			state.isChange = true;
			state.changeSuccess = false;
		},

		// 删除
		[DELETE_TEACHERS_INTO](state, action) {
			if (action.data == 1) {
				state.teachers.splice(action.index, 1);
			}
		},

		// 点击添加按钮，出现添加栏，点击取消隐藏
		[ADD_TEACHERS_INFO](state, action) {
			state.isAdd = action.isAdd;
			state.addItem.id = action.index;
			state.index = action.index;
			state.newId = action.index;
		},

		// 添加成功
		[ADD_TEACHERS_INFO_SUCCESS](state, action) {
			state.isAdd = false;
			state.addSuccess = true;
			state.index = 0;
			state.addItem = {};
		},

		// 添加失败
		[ADD_TEACHERS_INFO_FAIL](state, action) {
			state.isAdd = true;
			state.addSuccess = false;
		},

	},

	actions: {
		[GET_TEACHERS_INFO]({ commit }) {
			api.getInfor("teachers").then(res => {	
				commit(GET_TEACHERS_INFO,{
					data: res.data
				})
			}).catch(err => {

			})
		},

		// 点击图片，设置被点击图片的索引，显示或隐藏
		[SET_TEACHERS_INDEX]({ commit }, item) {
			commit(SET_TEACHERS_INDEX,{
				id: item.id,
				index: item.index,
				isUploading: item.isUploading,
				className: item.className
			})
		},

		// 点击修改按钮，出现修改栏
		[CHANGE_TEACHERS_INFO]({ commit }, item) {
			commit(CHANGE_TEACHERS_INFO,{
				index: item.index,
				isChange: item.isChange
			})
		},

		// 提交修改的内容
		[SUBMIT_TEACHERS_INFO]({ commit }, item) {
			api.changeTeacher(item.id, item.intro, item.name).then(res => {
				if (res.data == 1){
					commit(CHANGE_TEACHERS_INFO_SUCCESS);
				} else{
					commit(CHANGE_TEACHERS_INFO_FAIL);
				}   
			}).catch(err => {
			    commit(CHANGE_TEACHERS_INFO_FAIL);
			});
		},

		// 删除
		[DELETE_TEACHERS_INTO]({ commit }, condition) {
			api.deleteItem(condition.id, "teachers").then(res => {	
				commit(DELETE_TEACHERS_INTO,{
					data: res.data,
					index: condition.index
				})
			}).catch(err => {

			})
		},

		// 点击添加按钮，出现添加栏
		[ADD_TEACHERS_INFO]({ commit }, add) {
			if (add.isAdd) {
				api.getNumber("teachers").then(res => {
					commit(ADD_TEACHERS_INFO, {
						isAdd: add.isAdd,
						index:(parseInt(res.data[0].id) + 1)
					})
				}).catch(err => {
					commit(ADD_TEACHERS_INFO_FAIL);
				});
			} else{
				commit(ADD_TEACHERS_INFO, {
					isAdd: add.isAdd,
					index:0
				})
			}
			
		},

		// 增加内容
		[SUBMIT_ADD_TEACHERS_INFO]({ commit }, item) {
			api.addTeacher(item.id, item.intro, item.name).then(res => {
				if (res.data != 0){
					commit(ADD_TEACHERS_INFO_SUCCESS);					
				} else{
					commit(ADD_TEACHERS_INFO_FAIL);
				}   
			}).catch(err => {
			    commit(ADD_TEACHERS_INFO_FAIL);
			});
		},


		// 上传图片
		[UPLOAD_TEACHERS_IAMGE]({ commit }, file) {
			let fileReader = new FileReader();
			fileReader.readAsDataURL(file.data);
	
			let className = file.className;
			let fileName = "teacher";
			let time = Date.now();
			if (className == "imgsrc") {
				fileName = 'teacher-' + file.id + time;
			} else {
				fileName = 'tcontent-' + file.id + time;
			}
			 
			fileReader.onload = e => {
				api.uploadImage(e.target.result, fileName, file.id, "teachers").then(res => {
					if (res.data != 0){
						commit(UPLOAD_TEACHERS_IAMGE_SUCCESS, {
							name: res.data
						});
					} else{
						commit(UPLOAD_TEACHERS_IAMGE_FAIL);
					}   
				}).catch(err => {
				    commit(UPLOAD_TEACHERS_IAMGE_FAIL);
				});
			}
		}
	}
}