<template>
	<div class="container">
		<section>
			<h3 class="container-h">
				<span>预约管理</span>
			</h3>
			<table>
				<thead>
					<tr>
						<th>序号</th>
						<th>姓名</th>
						<th>单位或学校</th>
						<th>预约老师</th>
						<th>联系方式</th>
						<th>操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in joins">
						<td>{{ index + 1 }}</td>
						<td>{{ item.name }}</td>
						<td>{{ item.company }}</td>
						<td>{{ item.teacher }}</td>
						<td>{{ item.connect }}</td>
						<td><span class="delete" @click="deteteItem({id:item.jId, index:index})">删除</span></td>
					</tr>
				</tbody>
			</table>
		</section>
	</div>
</template>


<script>
import { mapActions, mapState} from 'vuex'
import { GET_JOIN_INFO , DELETE_JOIN_PERSON} from './../../vuex/type.js'

export default{
	computed: mapState({ 
		joins: store => store.JoinInfo.joins,
	}),
	methods:{
		...mapActions([GET_JOIN_INFO, DELETE_JOIN_PERSON]),
		deteteItem(data){
			if (confirm("确认删除？")) {
				this.DELETE_JOIN_PERSON(data);
			}
		}
	},
	created(){
		this.GET_JOIN_INFO();
	}
}
</script>