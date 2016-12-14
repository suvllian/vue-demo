<template>
	<div class="container">
		<section>
			<h2>部门员工信息</h2>
			<table>
				<thead>
					<tr>
						<th>工号</th>
						<th>姓名</th>
						<th>性别</th>
						<th>年龄</th>
						<th>电话</th>
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

				<tbody v-for="(item,index) in data">
					<h1>&nbsp;</h1>
					<h3>{{index}}月</h3>	
					<tr v-for="single in item">
						<td>{{single.E_No}}</td>
						<td>{{single.E_Name}}</td>
						<td>{{single.E_Sex}}</td>
						<td>{{single.E_Age}}</td>
						<td>{{single.E_Tel}}</td>
						<td>{{single.R_No}}</td>
						<td>{{single.At_LateTimes}}</td>
						<td>{{single.At_AbsentTimes}}</td>
						<td>{{single.R_BaseSalary}}</td>
						<td></td>
						<td>{{single.At_DeductMoney}}</td>
						<td>{{parseInt(single.R_BaseSalary) - parseInt(single.At_DeductMoney)}}</td>
						<td>{{single.S_Month}}</td>
						<td><a @click.prevent="callback" href="" title="修改">修改</a>/<a @click.prevent="callback" href="" title="删除">删除</a></td>
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
				data:[]
			}
		},

		computed: mapState({ user: state => state.user }),

		methods:{
			getAllData:function(){
				var url = "http://127.0.0.1/api/allData.php";
				var xhr = new XMLHttpRequest();
	            xhr.open('POST',url);
				var postData = "id=" + this.user.id ;
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
	            var that = this; 
	            xhr.onload = function(e){
	            	var data = JSON.parse(this.response);
	            	
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
	            }
	            xhr.send(postData);
			}
		},

		created(){
			this.getAllData();
		}
	}
</script>

<style lang="scss" scoped>
    .container{
    	width:100%;
    	padding:10px;
    	position:relative;
    	margin:1em auto 3em;
    	min-height:76vh;
    }

    h2{
    	font-size:26px;
    	font-weight:400;
    	margin:16px 0;
    	color:#333;
    	text-align:center;
    }

    h3{
    	font-size:24px;
    	font-weight:400;
    	position:absolute;
    	left:-100px;
    	text-align:center;
    	width:100px;
    	background-color:#eee;
    	color:#333;
    	margin:10px 0;
    	padding:10px;
    }

   table {
		border: 2px solid #42b983;
		border-radius: 3px;
		background-color: #fff;
		margin:0 auto;
		position:relative;

		th, td {  
		   padding: 10px;
		   font-size:18px;
		   min-width:80px;
		}

		th{
			letter-spacing:1px;
		}

		td{
			text-align:center;
		}
	}

	a{
		color:#bbb;
		transition:0.5s all ease;

		&:hover{
			color:#000;
		}
	}
</style>