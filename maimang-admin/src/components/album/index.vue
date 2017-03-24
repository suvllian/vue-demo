<template>
	<div class="container">
		<section>
			<h3 class="container-h">
				<span>首屏管理</span>
			</h3>
			<table>
				<thead>
					<tr>
						<th>序号</th>
						<th>图片</th>
						<th>详情</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in albums">
						<td>{{ index + 1 }}</td>
						<td @click="SET_ALBUM_IMAGE_INDEX(index+1)"><label for="uploadBtn"><img :src="item.src"></label></td>
						<td>{{ item.intro }}</td>
						<td><span class="submit" @click="CHANGE_ALBUM_INFO({index:index, isChange:true})">修改</span></td>
					</tr>

					<!-- 修改栏 -->
					<tr v-if="isChange" class="tr-change">
						<td>{{ item.cId }}</td>
						<td><img :src="item.src"></td>
						<td><input type="text" v-model="item.intro"></td>
						<td>
							<span class="submit" @click="SUBMIT_ALBUM_INFO(item)">确定</span>
							<span class="submit" @click="CHANGE_ALBUM_INFO({index:0, isChange:false})">取消</span>
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
				<button class="blue-Btn" @click.prevent="SET_ALBUM_IMAGE_INDEX(0)">取消</button>
			</div>
			<!-- 文件上传预览 -->
		</section>
		<input id="uploadBtn" type="file" @change="selectImage" ref="file">
	</div>
</template>

<script>
import { mapActions, mapState} from 'vuex'
import { GET_ALBUM_INFO, SET_ALBUM_IMAGE_INDEX, 
		UPLOAD_ALBUM_IMAGE, CHANGE_ALBUM_INFO,
		SUBMIT_ALBUM_INFO } from './../../vuex/type.js'
import { preViewImg } from './../../utils/preImage.js'

export default{
	computed: mapState({ 
		albums: store => store.albumInfo.albums,
		index: store => store.albumInfo.index,
		success: store => store.albumInfo.success,
		isChange: store => store.albumInfo.isChange,
		item: store => store.albumInfo.item,
		changeSuccess: store => store.albumInfo.changeSuccess,
	}),
	methods:{
		...mapActions([GET_ALBUM_INFO, SET_ALBUM_IMAGE_INDEX, 
			UPLOAD_ALBUM_IMAGE, CHANGE_ALBUM_INFO, SUBMIT_ALBUM_INFO]),
		selectImage(){
		    preViewImg(this.$refs.file.files[0], this.$refs.imageView);
		},
		uploadImage(){
			this.UPLOAD_ALBUM_IMAGE({data: this.$refs.file.files[0], index: this.index});
		},

		
	},
	created(){
		this.GET_ALBUM_INFO();
	}
}
</script>