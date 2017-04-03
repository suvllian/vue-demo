<template>
	<div v-if="userInfo.admin">
		<Nav></Nav>
		<div class="container">
			<section>
				<h3 class="container-h">
					<span>详情页管理</span>
				</h3>
			</section>
			<table>
				<thead>
					<tr>
						<th>序号</th>
						<th>标题</th>
						<th>链接</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in articles">
						<td>{{ index + 1 }}</td>
						<td><a :href="'http://mymovement.com/article?id=' + item.id" target="_blank">{{item.title}}</a></td>
						<td>{{ 'http://mymovement.com/article?id=' + item.id }}</td>
						<td><span class="delete" @click="deteteItem({index:index,id:item.id})">删除</span></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import Nav from './../home/nav.vue';
import { mapActions, mapState} from 'vuex';
import { GET_ARTICLE_INFO, DELETE_ARTICLE } from './../../vuex/type.js';

export default {
    components: { Nav },
    computed: mapState({ 
		articles: store => store.PageInfo.articles,
		userInfo: store => store.Login.userInfo
	}),
	methods: {
		...mapActions([GET_ARTICLE_INFO, DELETE_ARTICLE]),
		deteteItem(data){
			if (confirm("确认删除？")) {
				this.DELETE_ARTICLE(data);
			}
		}
	},
	created(){
		if (!this.userInfo.admin) {
			this.$router.replace("login");
			return;
		}
		this.GET_ARTICLE_INFO();
	}
}
</script>