<template>
	<div class="container">
		<section v-for="(item,index) in data">
			<h2>{{department[index-1].name}}</h2>
			<table border="1">
				<thead>
					<tr>
						<th>工号</th>
						<th>姓名</th>
						<th>职位</th>
						<th>电话</th>
						<th>年度工资</th>
						<th>年度津贴</th>
						<th>年终奖金</th>	
					</tr>
				</thead>
				<tbody>
					<tr v-for="single in item">
						<td>{{single.E_No}}</td>
						<td>{{single.E_Name}}</td>
						<td>{{single.R_Name}}</td>
						<td>{{single.E_Tel}}</td>						
						<td>{{single["SUM(R_BaseSalary)"]}}</td>
						<td>{{single["SUM(Al_Reward)"]}}</td>
						<td>{{single["SUM(R_BaseSalary)"] + single["SUM(Al_Reward)"]}}</td>
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
                    type : "year"
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
    .container{
    	width: 1080px;
    }
</style>