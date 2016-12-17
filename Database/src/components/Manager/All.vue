<template>
	<div class="container">
		<section>
			<h2>{{title}}</h2>
			<input type="text" v-model="serach" placeholder="输入工号或员工姓名回车搜索" @keyup.enter="serachData">
			<table>
				<thead>
					<tr>
						<th>工号</th>
						<th>姓名</th>
						<th>性别</th>
						<th>年龄</th>
						<th>电话</th>
						<th>部门</th>
						<th>等级</th>
						<th>迟到次数</th>
						<th>缺勤次数</th>
						<th>基本工资</th>		
						<th>总津贴</th>
						<th>应扣工资</th>
						<th>总工资</th>
						<th>月份</th>
						<th>操作</th>
					</tr>
				</thead>

				<tbody v-for="(item,index) in data ">
					<h1>&nbsp;</h1>
					<h3>{{index}}月</h3>	
					<tr v-for="single in item">
						<td>{{single.E_No}}</td>
						<td>{{single.E_Name}}</td>
						<td>{{single.E_Sex}}</td>
						<td>{{single.E_Age}}</td>
						<td>{{single.E_Tel}}</td>
						<td>{{single.R_PartName}}</td>
						<td>{{single.R_No}}</td>
						<td>{{single.At_LateTimes}}</td>
						<td>{{single.At_AbsentTimes}}</td>
						<td>{{single.R_BaseSalary}}</td>
						<td>{{single.S_Reward}}</td>
						<td>{{single.At_DeductMoney}}</td>
						<td>{{parseInt(single.R_BaseSalary) - parseInt(single.At_DeductMoney)}}</td>
						<td>{{single.S_Month}}</td>
						<td><a @click.prevent="callback" href="" title="修改">修改</a>/<a @click.prevent="callback" href="" title="录入">录入</a></td>
					</tr>
				</tbody>
			</table>
		</section>

	</div>
</template>

<script>
	import { mapState } from 'vuex'
	
	export default {
		data(){
			return{
				title:"部门员工信息",
				data:[],
				serach:""
			}
		},

		computed: mapState({ user: state => state.user }),

		methods:{
			getAllData:function(){
				var jsonData = {
					id : this.user.id
				}
				var url = "allData.php";
				var that = this;
                this.$root.getPostData(jsonData,url).then(function (res) {
	               var data = res.data;

	            	for(var each in data){
		        		for(var item in data[each]){
			        		if(data[each][item].R_No=="1"){
			        			data[each][item].R_No = "经理";
			        		}else if(data[each][item].R_No=="2"){
			        			data[each][item].R_No = "副经理";
			        		}else if(data[each][item].R_No=="3"){
			        			data[each][item].R_No = "组长";
			        		}else if(data[each][item].R_No=="4"){
			        			data[each][item].R_No = "员工";
			        		}
			        	}	
		        	}	
	                that.data = data;
                },function (res) {
                    console.log(res.data);
                });
			},
			serachData:function(){
				var jsonData = {
					id : this.user.id,
					value : this.serach,
					type : "serach"
				}
				var url = "data.php";
				var that = this;
                this.$root.getPostData(jsonData,url).then(function (res) {
	                var data = res.data;

	                var responseLength = data.length;
		        	if(responseLength===0){
			        	that.title = "没有你要搜索的内容";
			        	return ;
			        }

	            	for(var each in data){
		        		for(var item in data[each]){
			        		if(data[each][item].R_No=="1"){
			        			data[each][item].R_No = "经理";
			        		}else if(data[each][item].R_No=="2"){
			        			data[each][item].R_No = "副经理";
			        		}else if(data[each][item].R_No=="3"){
			        			data[each][item].R_No = "组长";
			        		}else if(data[each][item].R_No=="4"){
			        			data[each][item].R_No = "员工";
			        		}
			        	}	
		        	}	
	                that.data = data;
                },function (res) {
                    console.log(res.data);
                });
			},
		},

		created(){
			this.getAllData();
		}
	}
</script>

<style lang="scss" scoped>
    @import "./../../assets/style/all.scss";
</style>