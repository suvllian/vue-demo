import api from './../../api';
import router from './../../route.js'
import { GET_PERSON_INFO, SET_PERSON_INDEX, CHANGE_PERSON_INFO,
		CHANGE_PERSON_INFO_SUCCESS, CHANGE_PERSON_INFO_FAIL, DELETE_PERSON_INFO,	
		SUBMIT_PERSON_INFO, UPLOAD_PERSON_IAMGE, UPLOAD_PERSON_IAMGE_SUCCESS,
		UPLOAD_PERSON_IAMGE_FAIL, CHANGE_PERSON_SRC_INFO, SUBMIT_PERSON_SRC_INFO,
		SUBMIT_PERSON_SRC_INFO_SUCCESS, SUBMIT_PERSON_SRC_INFO_FAIL, 
		ADD_PERSON_INFO, ADD_PERSON_INFO_SUCCESS, ADD_PERSON_INFO_FAIL,
		SUBMIT_ADD_PERSON_INFO} from './../type';

export default {
	state: {
		// 艺人信息
		people:[],

		// 图片的索引
		index:0,

		id: 0,

		isUploading: false,

		// 上传成功
		success: true,

		// 大图是否出现修改栏
		isChange: false,

		// 小图是否出现修改栏
		srcIsChange: false,

		// 大图是否修改成功
		changeSuccess:true,

		// 小图是否修改成功
		srcChangeSuccess: true,

		// 修改内容
		item: {},

		// 上传图片类型
		className: 'person',

		// 当前页码
		page: 1,

		// 添加
		isAdd: false,

		// 添加成功
		addSuccess:true,

		// 添加的内容
		addItem: {},

		newId: 0, 

		reload: 1
	},

	mutations: {
		// 得到艺人信息
		[GET_PERSON_INFO](state, action) {
			state.people = action.data;
			state.page = action.page;
		},

		// 设置被点击图片索引。包括大图和小图
		[SET_PERSON_INDEX](state, action) {
			state.id = action.id;
			state.index = action.index;
			state.className = action.className;
			state.isUploading = action.isUploading;
		},

		// 上传成功
		[UPLOAD_PERSON_IAMGE_SUCCESS](state, action) {
			state.isUploading = false;
			state.success = true;
			if (state.className == "person") {
				state.people.imgsrc = action.name;
			} else {
				state.people.pic[state.index].imgsrc = action.name;
			}
		},

		// 上传图片失败
		[UPLOAD_PERSON_IAMGE_FAIL](state, action) {
			state.success = false;
		},

		// 修改艺人信息
		[CHANGE_PERSON_INFO](state, action) {
			state.isChange = action.isChange;
			state.item = state.people;
		},

		// 修改艺人信息成功
		[CHANGE_PERSON_INFO_SUCCESS](state, action) {
			state.isChange = false;
			state.changeSuccess = true;
		},

		// 修改艺人信息失败
		[CHANGE_PERSON_INFO_FAIL](state, action) {
			state.isChange = true;
			state.changeSuccess = false;
		},


		// 修改图片链接
		[CHANGE_PERSON_SRC_INFO](state, action) {
			state.srcIsChange = action.srcIsChange;
			state.item = state.people.pic[action.index];
			state.item.index = action.index;
		},

		// 修改图片链接成功
		[SUBMIT_PERSON_SRC_INFO_SUCCESS](state, action) {
			state.srcIsChange = false;
			state.srcChangeSuccess = true;
		},

		// 修改图片链接失败
		[SUBMIT_PERSON_SRC_INFO_FAIL](state, action) {
			state.srcIsChange = true;
			state.srcChangeSuccess = false;
		},

		// 点击添加按钮，出现添加栏，点击取消隐藏
		[ADD_PERSON_INFO](state, action) {
			state.isAdd = action.isAdd;
			state.addItem.id = action.id;
			state.newId = action.id;
		},

		// 添加成功
		[ADD_PERSON_INFO_SUCCESS](state, action) {
			state.isAdd = false;
			state.addSuccess = true;
			state.index = 0;
			state.addItem = {};
			state.reload = state.reload + 1;
		},

		// 添加失败
		[ADD_PERSON_INFO_FAIL](state, action) {
			state.isAdd = true;
			state.addSuccess = false;
		},

		[DELETE_PERSON_INFO](state, action) {
			state.reload = state.reload + 1;
		},

	},

	actions: {
		// 得到首屏所有图片信息
		[GET_PERSON_INFO]({ commit }, page) {
			api.getPerson(page).then(res => {	
				if (res.data.name) {
					commit(GET_PERSON_INFO,{
						data: res.data,
						page: page
					})
				}	
			}).catch(err => {

			})
		},

		// 点击图片，设置被点击图片的索引，显示或隐藏
		[SET_PERSON_INDEX]({ commit }, item) {
			commit(SET_PERSON_INDEX,{
				index: item.index,
				id: item.id,
				className: item.className,
				isUploading: item.isUploading
			})
		},

		// 修改艺人信息
		[CHANGE_PERSON_INFO]({ commit }, change) {
			commit(CHANGE_PERSON_INFO,{
				isChange: change.isChange
			})
		},

		// 提交修改艺人信息
		[SUBMIT_PERSON_INFO]({ commit }, item) {
			api.changePerson(item.id, item.name, item.intro).then(res => {
				if (res.data == 1){
					commit(CHANGE_PERSON_INFO_SUCCESS);
				} else{
					commit(CHANGE_PERSON_INFO_FAIL);
				}   
			}).catch(err => {
			    commit(CHANGE_PERSON_INFO_FAIL);
			});
		},

		// 修改小图链接
		[CHANGE_PERSON_SRC_INFO]({ commit }, change) {
			commit(CHANGE_PERSON_SRC_INFO,{
				index: change.index,
				srcIsChange: change.srcIsChange
			})
		},

		// 提交修改的小图链接
		[SUBMIT_PERSON_SRC_INFO]({ commit }, item) {
			api.changePersonSrc(item.id, item.src).then(res => {
				if (res.data == 1){
					commit(SUBMIT_PERSON_SRC_INFO_SUCCESS);
				} else{
					commit(SUBMIT_PERSON_SRC_INFO_FAIL);
				}   
			}).catch(err => {
			    commit(SUBMIT_PERSON_SRC_INFO_FAIL);
			});
		},

		// 点击添加按钮，出现添加栏
		[ADD_PERSON_INFO]({ commit }, add) {
			if (add.isAdd) {
				api.getNumber("person").then(res => {
					commit(ADD_PERSON_INFO, {
						isAdd: add.isAdd,
						id: (parseInt(res.data[0].id) + 1)
					})
				}).catch(err => {
					commit(ADD_PERSON_INFO_FAIL);
				});
			} else{
				commit(ADD_PERSON_INFO, {
					isAdd: add.isAdd,
					index:0
				})
			}
			
		},

		// 增加内容
		[SUBMIT_ADD_PERSON_INFO]({ commit }, item) {
			api.addPerson(item.id, item.intro, item.name).then(res => {
				if (res.data == 1){
					commit(ADD_PERSON_INFO_SUCCESS);
				} else{
					commit(ADD_PERSON_INFO_FAIL);
				}   
			}).catch(err => {
			    commit(ADD_PERSON_INFO_FAIL);
			});
		},

		[DELETE_PERSON_INFO]({ commit }, condition) {
			api.deleteItem(condition.id, "person").then(res => {	
				commit(DELETE_PERSON_INFO,{
					data: res.data
				})
			}).catch(err => {

			})
		},

		// 上传图片
		[UPLOAD_PERSON_IAMGE]({ commit }, file) {
			let fileReader = new FileReader();
			fileReader.readAsDataURL(file.data);

			let className = file.className;
			let time = Date.now();
			let id = file.id;

			let fileName = 'person-' + id + '-' + time;	

			fileReader.onload = e => {
				api.uploadImage(e.target.result, fileName, id, className).then(res => {
					if (res.data != 0){
						commit(UPLOAD_PERSON_IAMGE_SUCCESS, {
							name: res.data
						});
					} else{
						commit(UPLOAD_PERSON_IAMGE_FAIL);
					}   
				}).catch(err => {
				    commit(UPLOAD_PERSON_IAMGE_FAIL);
				});
			}
		}
	}
}