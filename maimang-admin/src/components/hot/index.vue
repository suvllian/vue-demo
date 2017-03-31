<template>
	<div v-if="userInfo.admin">
		<Nav></Nav>
		<div class="container">
			<section>
				<h3 class="container-h">
					<span>热门课程</span>
				</h3>
				<table>
					<thead>
						<tr>
							<th>序号</th>
							<th>图片</th>
							<th>外链</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in hots">
							<td>{{ index + 1 }}</td>
							<td @click="SET_HOT_IMAGE_INDEX(index+1)"><label for="uploadBtn"><img :src="'./static/hot-img-' + (index+1) + '.jpg'"></label></td>
							<td>{{ item.src }}</td>
							<td><span class="change" @click="CHANGE_HOT_INFO({index:index, isChange:true})">修改</span></td>
						</tr>

						<!-- 修改栏 -->
						<tr v-if="isChange" class="tr-change">
							<td>{{ item.cId }}</td>
							<td><img :src="'./static/hot-img-' + (item.index+1) + '.jpg'"></td>
							<td><input type="text" v-model="item.src"></td>
							<td>
								<span class="change" @click="SUBMIT_HOT_INFO(item)">确定</span>
								<span class="change" @click="CHANGE_HOT_INFO({index:0, isChange:false})">取消</span>
							</td>
						</tr>
						<h3 class="container-h" v-if="!changeSuccess"><span>修改失败，请重试</span></h3>
						<!-- 修改栏 -->

					</tbody>
				</table>

				<!-- 文件上传预览 -->
				<div v-if="index">
					<h3 class="container-h" v-if="!success"><span>上传失败，请重试</span></h3>
					<img src="#" alt="图片预览" class="view" ref="imageView">
					<button class="blue-Btn" @click.prevent="uploadImage">上传</button>
					<button class="blue-Btn" @click.prevent="SET_HOT_IMAGE_INDEX(0)">取消</button>
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
import { GET_HOT_INFO, SET_HOT_IMAGE_INDEX, 
	UPLOAD_HOT_IMAGE, CHANGE_HOT_INFO, SUBMIT_HOT_INFO } from './../../vuex/type.js'
import { preViewImg } from './../../utils/preImage.js'

export default{
	components: { Nav },
	computed: mapState({ 
		hots: store => store.HotInfo.hots,
		index: store => store.HotInfo.index,
		success: store => store.HotInfo.success,
		isChange: store => store.HotInfo.isChange,
		item: store => store.HotInfo.item,
		changeSuccess: store => store.HotInfo.changeSuccess,
		userInfo: store => store.Login.userInfo
	}),
	methods:{
		...mapActions([GET_HOT_INFO, SET_HOT_IMAGE_INDEX, UPLOAD_HOT_IMAGE, 
			CHANGE_HOT_INFO, SUBMIT_HOT_INFO]),
		selectImage(){
		    preViewImg(this.$refs.file.files[0], this.$refs.imageView);
		},
		uploadImage(){
			this.UPLOAD_HOT_IMAGE({data: this.$refs.file.files[0], index: this.index});
		}
	},
	created(){
		if (!this.userInfo.admin) {
			this.$router.replace("login");
			return;
		}
		this.GET_HOT_INFO();
	}
}
</script>