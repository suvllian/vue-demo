<template>
	<div class="container">
		<div>
		<section>
			<h2 @click="print">基本信息</h2>
			<table border="1">
				<thead>
					<tr>
						<th>工号</th>
						<th>姓名</th>
						<th>性别</th>
						<th>年龄</th>
						<th>电话</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td>{{data[0].E_No}}</td>
						<td>{{data[0].E_Name}}</td>
						<td>{{data[0].E_Sex}}</td>
						<td>{{data[0].E_Age}}</td>
						<td>{{data[0].E_Tel}}</td>
					</tr>
				</tbody>
			</table>
		</section>

		<section>
			<h2>部门</h2>
			<table border="1">
				<thead>
					<tr>
						<th>部门号</th>
						<th>部门名称</th>
						<th>等级</th>
						<th>基本工资</th>
						<th>   </th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td>{{10 + data[0].R_PartNo}}</td>
						<td>{{data[0].R_PartName}}</td>
						<td>{{data[0].R_Name}}</td>
						<td>{{data[0].R_BaseSalary}}</td>
						<td></td>
					</tr>
				</tbody>
			</table>
		</section>


		<section>
			<h2>津贴</h2>
			<table border="1">
				<thead>
					<tr>
						<th>月份</th>
						<th>加班类别</th>
						<th>加班时间</th>
						<th>总津贴</th>
						<th>   </th>
					</tr>
				</thead>

				<tbody>
					<tr v-for="single in moreData[0]">
						<td>{{single.Al_Month}}</td>
						<td>{{single.Al_Kind}}</td>
						<td>{{single.Al_Time}}</td>
						<td>{{single.Al_Reward}}</td>
						<td>   </td>
					</tr>
				</tbody>
			</table>
		</section>

		<section>
			<h2>考勤</h2>
			<table border="1">
				<thead>
					<tr>
						<th>月份</th>
						<th>迟到次数</th>
						<th>缺勤次数</th>
						<th>应扣工资</th>
						<th>   </th>
					</tr>
				</thead>

				<tbody>
					<tr v-for="single in moreData[1]">
						<td>{{single.At_Month}}</td>
						<td>{{single.At_LateTimes}}</td>
						<td>{{single.At_AbsentTimes}}</td>
						<td>{{single.At_DeductMoney}}</td>
						<td></td>
					</tr>
				</tbody>
			</table>
		</section>

		<section>
			<h2>工资</h2>
			<table border="1">
				<thead>
					<tr>
						<th>月份</th>
						<th>基本工资</th>
						<th>津贴</th>
						<th>扣除</th>
						<th>总工资</th>
					</tr>
				</thead>
				
				<tbody>
					<tr v-for="single in moreData[2]">	
						<td>{{single.S_Month}}</td>
						<td>{{data[0].R_BaseSalary}}</td>
						<td>{{single.Al_Reward}}</td>
						<td>{{single.At_DeductMoney}}</td>
						<td>{{parseInt(data[0].R_BaseSalary) + parseInt(single.Al_Reward) - parseInt(single.At_DeductMoney)}}</td>
					</tr>
				</tbody>
			</table>
		</section>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	
	export default {
		computed: mapState({ user: state => state.user }),

		data(){
			return{
				data:[{
					Al_Kind:"0",
					Al_Month:"1",
					Al_Reward:"0",
					Al_Time:"0",
					At_AbsentTimes:"0",
					At_DeductMoney:"0",
					At_LateTimes:"0",
					At_Month:"2",
					E_Age:"20",
					E_Name:"宋青松",
					E_No:"10201",
					E_Sex:"男",
					E_Tel:"18292007714",
					R_BaseSalary:"2500",
					R_Name:"副经理",
					R_PartName:"财务部",
					R_PartNo:"1",
					S_Month:"1",
					S_TotalSalary:	null
				}],
				moreData:[]
			}
		},

		methods:{
			getBaseData:function(){
	            var xhr = new XMLHttpRequest();
	            var url = this.$root.url + "data.php";
	            xhr.open('POST',url);
				var postData = "id=" + this.user.id + "&type=base";
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
	            var that = this; 
	            xhr.onload = function(e){
	                var data = JSON.parse(this.response);
	                that.data = data;
	            }
	            xhr.send(postData);
			},
			getMoreData:function(){
				var xhr = new XMLHttpRequest();
				var url = this.$root.url + "data.php";
	            xhr.open('POST',url);
				var postData = "id=" + this.user.id + "&type=more";
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
	            var that = this; 
	            xhr.onload = function(e){
	                var data = JSON.parse(this.response);
	                that.moreData = data;
	            }
	            xhr.send(postData);
			},
			print:function(){
				window.print();
			}
		},
		created(){
			if(!this.user.id){
				this.$router.replace({ path: '/' });
			}
			this.getBaseData();
			this.getMoreData();
		}
	}
</script>

<style lang="scss" scoped>
    @import './../../assets/style/main.scss';
</style>