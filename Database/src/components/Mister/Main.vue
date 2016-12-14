<template>
	<div class="container">
		<section>
			<h2>财务部</h2>
			<table border="1">
				<thead>
					<tr>
						<th>月份</th>
						<th>部门号</th>
						<th>部门经理</th>
						<th>部门人数</th>
						<th>部门工资</th>
						<th>部门电话</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td>01</td>
						<td>0102</td>
						<td>彭晗</td>
						<td>30</td>
						<td>520000</td>
						<td>18292007712</td>
					</tr>
				</tbody>
			</table>
		</section>

		<section>
			<h2>财务部</h2>
			<table border="1">
				<thead>
					<tr>
						<th>月份</th>
						<th>部门号</th>
						<th>部门经理</th>
						<th>部门人数</th>
						<th>部门工资</th>
						<th>部门电话</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td>01</td>
						<td>0102</td>
						<td>彭晗</td>
						<td>30</td>
						<td>520000</td>
						<td>18292007712</td>
					</tr>
				</tbody>
			</table>
		</section>

		<section>
			<h2>财务部</h2>
			<table border="1">
				<thead>
					<tr>
						<th>月份</th>
						<th>部门号</th>
						<th>部门经理</th>
						<th>部门人数</th>
						<th>部门工资</th>
						<th>部门电话</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td>01</td>
						<td>0102</td>
						<td>彭晗</td>
						<td>30</td>
						<td>520000</td>
						<td>18292007712</td>
					</tr>
				</tbody>
			</table>
		</section>

		<section>
			<h2>财务部</h2>
			<table border="1">
				<thead>
					<tr>
						<th>月份</th>
						<th>部门号</th>
						<th>部门经理</th>
						<th>部门人数</th>
						<th>部门工资</th>
						<th>部门电话</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td>01</td>
						<td>0102</td>
						<td>彭晗</td>
						<td>30</td>
						<td>520000</td>
						<td>18292007712</td>
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
				data:[]
			}
		},

		methods:{
			getDepartData:function(){
	            var xhr = new XMLHttpRequest();
	            xhr.open('POST',this.url);
				var postData = "id=" + this.user.id + "&type=depart";
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
	            var that = this; 
	            xhr.onload = function(e){
	                var data = JSON.parse(this.response);
	                that.data = data;
	            }
	            xhr.send(postData);
			},
		}
	}
</script>

<style lang="scss" scoped>
    .container{
    	width:930px;
    	padding:10px;
    	position:relative;
    	margin:1em auto 3em;
    }

    h2{
    	font-size:26px;
    	font-weight:400;
    	margin:16px 0;
    	color:#333;
    }

    table {
		border: 2px solid #42b983;
		border-radius: 3px;
		background-color: #fff;
		min-width:930px;


		th, td {
		   min-width: 150px;
		   padding: 10px 20px;
		   font-size:22px;
		}

		td{
			text-align:center;
		}
	}
</style>