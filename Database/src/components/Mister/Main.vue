<template>
	<div class="container">
		<section v-for="(item,index) in data">
			<h2>{{department[index-1].name}}</h2>
			<table border="1">
				<thead>
					<tr>
						<th>部门号</th>
						<th>月份</th>
						<th>部门工资</th>
						<th>部门经理</th>
						<th>部门人数</th>
						<th>部门电话</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(list,title) in item" v-if="list.S_Month">
						<td>{{10 + item[0].E_RPartNo}}</td>
						<td>{{list.S_Month}}</td>
						<td>{{list["SUM(R_BaseSalary)"] + list["SUM(Al_Reward)"] - list["SUM(At_DeductMoney)"]}}</td>						
						
						<td>{{item[0].E_Name}}</td>
						<td>{{item[0]["COUNT(second.E_Name)"]}}</td>
						<td>{{item[0].E_Tel}}</td>
					</tr>
				</tbody>
			</table>
		</section>
	
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	
	export default {
		computed: mapState({ user: state => state.user }),

		data(){
			return{
				data:[],
				department:[
					{name:"财务部"},
					{name:"人事部"},
					{name:"销售部"},
					{name:"后勤部"}
				]
			}
		},

		methods:{
			getDepartData:function(){
				var jsonData = {
					id : this.user.id,
                    type : "depart"
				}
				var url = "data.php";
				var that = this;
                this.$root.getPostData(jsonData,url).then(function (res) {
	                that.data = res.data;
                },function (res) {
                    console.log(res.data);
                });
			}
		},

		created(){
			this.getDepartData();
		}
	}
</script>

<style lang="scss" scoped>
    @import './../../assets/style/main.scss';
</style>