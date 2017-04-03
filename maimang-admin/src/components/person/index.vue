<template>
	<div v-if="userInfo.admin">
		<Nav></Nav>
		<div class="container">
			<section>
				<h3 class="container-h">
					<span>旗下艺人</span>
					<button class="blue-Btn" @click.prevent="ADD_PERSON_INFO({isAdd:true})">添加</button>
				</h3>
				<table>
					<thead>
						<tr>
							<th>大图</th>
							<th>姓名</th>
							<th>介绍</th>
							<th>所有小图</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td @click="SET_PERSON_INDEX({index:people.id, className:'person'})"><label for="uploadBtn"><img class="td-big-img" :src="'./static/img/person-' + people.id + '-big.jpg'"></label></td>
							<td>{{ people.name }}</td>
							<td>{{ people.intro }}</td>
							<td class="tr-contain-table">
								<table>
									<thead>
										<tr>
											<th>序号</th>
											<th>图片</th>
											<th>链接</th>
											<th>操作</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(single, index) in people.pic">
											<td>{{ index + 1 }}</td>
											<td @click="SET_PERSON_INDEX({index:(index + 1), className:'content'})"><label for="uploadBtn"><img :src="'./static/img/person-' + people.id + '-' + (index + 1) + '.jpg'"></label></td>
											<td>{{ single.src }}</td>
											<td><span class="change" @click="CHANGE_PERSON_SRC_INFO({index:index, srcIsChange:true})">修改</span></td>
										</tr>

										<!-- 修改栏 -->
										<tr v-if="srcIsChange" class="tr-change">
											<td>{{ item.index+1 }}</td>
											<td><img :src="'./static/img/person-' + people.id + '-' + (item.index + 1) + '.jpg'"></td>
											<td><input type="text" v-model="item.src"></td>
											<td>
												<span class="change" @click="SUBMIT_PERSON_SRC_INFO(item)">确定</span>
												<span class="change" @click="CHANGE_PERSON_SRC_INFO({index:0, srcIsChange:false})">取消</span>
											</td>
										</tr>
										<h3 class="container-h" v-if="!srcChangeSuccess"><span>修改失败，请重试</span></h3>
										<!-- 修改栏 -->
									</tbody>
								</table>
							</td>	
							<td><span class="change-left" @click="CHANGE_PERSON_INFO({isChange:true})">修改</span><span class="delete-right" @click="deteteItem({id:people.id})">删除</span></td>	
						</tr>

						<!-- 修改栏 -->
						<tr v-if="isChange" class="tr-change">
							<td><img :src="'./static/img/person-' + people.id + '-big.jpg'"></td>
							<td><input type="text" v-model="item.name"></td>
							<td><textarea type="text" v-model="item.intro"></textarea></td>
							<td></td>
							<td>
								<span class="change" @click="SUBMIT_PERSON_INFO(item)">确定</span>
								<span class="change" @click="CHANGE_PERSON_INFO({isChange:false})">取消</span>
							</td>
						</tr>
						<h3 class="container-h" v-if="!changeSuccess"><span>修改失败，请重试</span></h3>
						<!-- 修改栏 -->

						<!-- 添加栏 -->
						<tr v-if="isAdd" class="tr-change">
							<td><label for="uploadBtn">上传图片</label></td>
							<td><input type="text" v-model="addItem.name"></td>
							<td><textarea type="text" v-model="addItem.intro"></textarea></td>
							<td></td>
							<td>
								<span class="change" @click="SUBMIT_ADD_PERSON_INFO(addItem)">确定</span>
								<span class="change" @click="ADD_PERSON_INFO({isAdd:false})">取消</span>
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
					<button class="blue-Btn" @click.prevent="SET_PERSON_INDEX({index:0, className:'person'})">取消</button>
				</div>
				<!-- 文件上传预览 -->
			</section>
			<input id="uploadBtn" type="file" @change="selectImage" ref="file">
			<section>
			    <div class="item">
			        <span @click="next(1)" class="change">首页</span>
			        <span @click="next(--page)" class="change">上一页</span>
			        <span @click="next(++page)" class="change">下一页</span>
			    </div>
		    </section>
		</div>	
	</div>
</template>

<script>
import Nav from './../home/nav.vue';
import { mapActions, mapState} from 'vuex'
import { GET_PERSON_INFO, SET_PERSON_INDEX, CHANGE_PERSON_INFO,
		DELETE_PERSON_INFO, SUBMIT_PERSON_INFO, UPLOAD_PERSON_IAMGE,
		CHANGE_PERSON_SRC_INFO, SUBMIT_PERSON_SRC_INFO, ADD_PERSON_INFO,
		SUBMIT_ADD_PERSON_INFO } from './../../vuex/type.js'
import { preViewImg } from './../../utils/preImage.js'

export default{
	components: { Nav },
	computed: mapState({ 
		userInfo: store => store.Login.userInfo,
		people: store => store.PersonInfo.people,
		index: store => store.PersonInfo.index,
		isChange: store => store.PersonInfo.isChange,
		srcIsChange: store => store.PersonInfo.srcIsChange,
		changeSuccess: store => store.PersonInfo.changeSuccess,
		item: store => store.PersonInfo.item,
		success: store => store.PersonInfo.success,
		className: store => store.PersonInfo.className,
		srcChangeSuccess: store => store.PersonInfo.srcChangeSuccess,
		page: store => store.PersonInfo.page,
		isAdd: store => store.PersonInfo.isAdd,
		addSuccess: store => store.PersonInfo.addSuccess,
		addItem: store => store.PersonInfo.addItem,
	}),
	methods:{
		...mapActions([GET_PERSON_INFO, SET_PERSON_INDEX, CHANGE_PERSON_INFO,
		DELETE_PERSON_INFO, SUBMIT_PERSON_INFO, UPLOAD_PERSON_IAMGE,
		CHANGE_PERSON_SRC_INFO, SUBMIT_PERSON_SRC_INFO, ADD_PERSON_INFO,
		SUBMIT_ADD_PERSON_INFO]),
		selectImage(){
		    preViewImg(this.$refs.file.files[0], this.$refs.imageView);
		},
		uploadImage(){
			this.UPLOAD_PERSON_IAMGE({data: this.$refs.file.files[0], index: this.index, className: this.className, id: this.people.id});
		},

		next(page){
			if (page > 0) {
				this.GET_PERSON_INFO(page);
			}
		},

		deteteItem(data){
			if (confirm("确认删除？")) {
				this.DELETE_PERSON_INFO(data);
				this.GET_PERSON_INFO(1);
			}
		}
	},
	created(){
		if (!this.userInfo.admin) {
			this.$router.replace("login");
			return;
		}
		this.GET_PERSON_INFO(1);
	}
}
</script>