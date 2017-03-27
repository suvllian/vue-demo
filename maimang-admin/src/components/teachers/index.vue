<template>
	<div>
	<!-- <div v-if="userInfo.admin"> -->
		<Nav></Nav>
		<div class="container">
			<section>
				<h3 class="container-h">
					<span>明星导师</span>
					<button class="blue-Btn" @click.prevent="ADD_TEACHERS_INFO({isAdd:true})">添加</button>
				</h3>
				<table>
					<thead>
						<tr>
							<th>序号</th>
							<th>姓名</th>
							<th>简介</th>
							<th>图片</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in teachers">
							<td>{{ index + 1 }}</td>
							<td>{{ item.name }}</td>
							<td>{{ item.intro }}</td>
							<td @click="SET_TEACHERS_INDEX(item.id)"><label for="uploadBtn"><img :src="item.src"></label></td>
							<td><span class="change" @click="CHANGE_TEACHERS_INFO({index:index, isChange:true})">修改</span><span class="delete" @click="deteteItem({id:item.id, index:index})">删除</span></td>
						</tr>

						<!-- 修改栏 -->
						<tr v-if="isChange" class="tr-change">
							<td>{{ item.id }}</td>
							<td><input type="text" v-model="item.name"></td>
							<td><input type="text" v-model="item.intro"></td>
							<td><img :src="item.src"></td>
							<td>
								<span class="submit" @click="SUBMIT_TEACHERS_INFO(item)">确定</span>
								<span class="submit" @click="CHANGE_TEACHERS_INFO({index:0, isChange:false})">取消</span>
							</td>
						</tr>
						<h3 class="container-h" v-if="!changeSuccess"><span>修改失败，请重试</span></h3>
						<!-- 修改栏 -->

						<!-- 添加栏 -->
						<tr v-if="isAdd" class="tr-change">
							<td>添加</td>
							<td><input type="text" v-model="addItem.name"></td>
							<td><input type="text" v-model="addItem.intro"></td>
							<td><label for="uploadBtn">上传图片</label></td>
							<td>
								<span class="submit" @click="SUBMIT_ADD_TEACHERS_INFO(addItem)">确定</span>
								<span class="submit" @click="ADD_TEACHERS_INFO({isAdd:false})">取消</span>
							</td>
						</tr>
						<h3 class="container-h" v-if="!addSuccess"><span>添加失败，请重试</span></h3>
						<!-- 添加栏 -->

					</tbody>
				</table>

				<!-- 文件上传预览 -->
				<div v-if="index">
					<h3 class="container-h" v-if="!success"><span>上传失败，请重试</span></h3>
					<img src="#" alt="图片预览" class="view" ref="imageView">
					<button class="blue-Btn" @click.prevent="uploadImage">上传</button>
					<button class="blue-Btn" @click.prevent="SET_TEACHERS_INDEX(0)">取消</button>
				</div>
				<!-- 文件上传预览 -->
			</section>
			<input id="uploadBtn" type="file" @change="selectImage" ref="file">
		</div>
	</div>
</template>

<script>
import Nav from './../home/nav.vue';
import { mapActions, mapState} from 'vuex'
import { GET_TEACHERS_INFO, SET_TEACHERS_INDEX, UPLOAD_TEACHERS_IAMGE,
		DELETE_TEACHERS_INTO, SUBMIT_TEACHERS_INFO, CHANGE_TEACHERS_INFO,
		ADD_TEACHERS_INFO, SUBMIT_ADD_TEACHERS_INFO } from './../../vuex/type.js'
import { preViewImg } from './../../utils/preImage.js'

export default{
	components: { Nav },
	computed: mapState({ 
		teachers: store => store.TeachersInfo.teachers,
		index: store => store.TeachersInfo.index,
		success: store => store.TeachersInfo.success,
		isChange: store => store.TeachersInfo.isChange,
		item: store => store.TeachersInfo.item,
		changeSuccess: store => store.TeachersInfo.changeSuccess,
		isAdd: store => store.TeachersInfo.isAdd,
		addSuccess: store => store.TeachersInfo.addSuccess,
		addItem: store => store.TeachersInfo.addItem,
		userInfo: store => store.Login.userInfo
	}),
	methods:{
		...mapActions([GET_TEACHERS_INFO, SET_TEACHERS_INDEX, UPLOAD_TEACHERS_IAMGE,
					DELETE_TEACHERS_INTO, SUBMIT_TEACHERS_INFO, CHANGE_TEACHERS_INFO,
					ADD_TEACHERS_INFO, SUBMIT_ADD_TEACHERS_INFO]),
		selectImage(){
		    preViewImg(this.$refs.file.files[0], this.$refs.imageView);
		},
		uploadImage(){
			this.UPLOAD_TEACHERS_IAMGE({data: this.$refs.file.files[0], index: this.index});
		},
		deteteItem(data){
			if (confirm("确认删除？")) {
				this.DELETE_TEACHERS_INTO(data);
			}
		}
	},
	created(){
		// if (!this.userInfo.admin) {
		// 	this.$router.replace("login");
		// 	return;
		// }
		this.GET_TEACHERS_INFO();
	}
}
</script>