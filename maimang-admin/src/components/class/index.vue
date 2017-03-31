<template>
	<div v-if="userInfo.admin">
		<Nav></Nav>
		<div class="container">
			<section>
				<h3 class="container-h">
					<span>专业设置</span>
				</h3>
				<table>
					<thead>
						<tr>
							<th>序号</th>
							<th>名称</th>
							<th>链接</th>
							<th>操作</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item, index) in classInfo">
							<td>{{ index + 1 }}</td>
							<td>{{ item.name }}</td>
							<td>{{ item.src }}</td>
							<td><span class="change" @click="CHANGE_CLASS_INFO({index:index, isChange:true})">修改</span></td>
						</tr>

						<!-- 修改栏 -->
						<tr v-if="isChange" class="tr-change">
							<td>{{ item.id }}</td>
							<td><input type="text" v-model="item.name" disabled="true"></td>
							<td><input type="text" v-model="item.src"></td>
							<td>
								<span class="change" @click="SUBMIT_CLASS_INFO(item)">确定</span>
								<span class="change" @click="CHANGE_CLASS_INFO({index:0, isChange:false})">取消</span>
							</td>
						</tr>
						<h3 class="container-h" v-if="!changeSuccess"><span>修改失败，请重试</span></h3>
						<!-- 修改栏 -->
					</tbody>
				</table>

			</section>
		</div>
	</div>
</template>

<script>
import Nav from './../home/nav.vue';
import { mapActions, mapState} from 'vuex'
import { GET_CLASS_INFO, CHANGE_CLASS_INFO, SUBMIT_CLASS_INFO } from './../../vuex/type.js'

export default{
	components: { Nav },
	computed: mapState({ 
		userInfo: store => store.Login.userInfo,
		classInfo: store => store.ClassInfo.classInfo,
		isChange: store => store.ClassInfo.isChange,
		changeSuccess: store => store.ClassInfo.changeSuccess,
		item: store => store.ClassInfo.item
	}),
	methods:{
		...mapActions([GET_CLASS_INFO, CHANGE_CLASS_INFO, SUBMIT_CLASS_INFO]),
	},
	created(){
		if (!this.userInfo.admin) {
			this.$router.replace("login");
			return;
		}
		this.GET_CLASS_INFO();
	}
}
</script>