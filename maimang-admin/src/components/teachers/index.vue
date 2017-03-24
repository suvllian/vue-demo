<template>
	<div class="container">
		<section>
			<h3 class="container-h">
				<span>明星导师</span>
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
						<td><img :src="item.src"></td>
						<td><span class="change" @click="">修改</span><span class="delete" @click="">删除</span></td>
					</tr>
				</tbody>
			</table>
		</section>
	</div>
</template>

<script>
import { mapActions, mapState} from 'vuex'
import { GET_TEACHERS_INFO } from './../../vuex/type.js'

export default{
	computed: mapState({ 
		teachers: store => store.TeachersInfo.teachers,
	}),
	methods:{
		...mapActions([GET_TEACHERS_INFO])
	},
	created(){
		this.GET_TEACHERS_INFO();
	}
}
</script>