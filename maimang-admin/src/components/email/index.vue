<template>
	<div class="container">
		<section>
			<h3 class="container-h">
				<span>订阅邮箱</span>
			</h3>
			<table>
				<thead>
					<tr>
						<th>序号</th>
						<th>邮箱</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in email">
						<td>{{ index + 1 }}</td>
						<td>{{ item.email }}</td>
						<td><span class="delete" @click="deteteItem({id:item.id, index:index})">删除</span></td>
					</tr>
				</tbody>
			</table>
		</section>
	</div>
</template>

<script>
import { mapActions, mapState} from 'vuex'
import { GET_EMAIL_INFO, DELETE_EMAIL } from './../../vuex/type.js'

export default{
	computed: mapState({ 
		email: store => store.EmailInfo.email,
	}),
	methods:{
		...mapActions([GET_EMAIL_INFO, DELETE_EMAIL]),
		deteteItem(data){
			if (confirm("确认删除？")) {
				this.DELETE_EMAIL(data);
			}
		}
	},
	created(){
		this.GET_EMAIL_INFO();
	}
}
</script>