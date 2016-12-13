<template>
	<div class="container">
		<section>
			<h2>基本信息</h2>
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
						<td>0102</td>
						<td>彭晗</td>
						<td>男</td>
						<td>19</td>
						<td>18292007712</td>
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
					<tr>
						<td>0102</td>
						<td>彭晗</td>
						<td>男</td>
						<td>19</td>
						<td>   </td>
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
						<td>0102</td>
						<td>彭晗</td>
						<td>男</td>
						<td>19</td>
						<td></td>
					</tr>
				</tbody>
			</table>
		</section>

		<section>
			<h2>考勤</h2>
			<table border="1">
				<!-- <caption>基本信息</caption> -->

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
					<tr>
						<td>0102</td>
						<td>彭晗</td>
						<td>男</td>
						<td>19</td>
						<td></td>
					</tr>
				</tbody>
			</table>
		</section>

		<section>
			<h2>工资</h2>
			<table border="1">
				<!-- <caption>基本信息</caption> -->

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
					<tr>	
						<td>0102</td>
						<td>彭晗</td>
						<td>男</td>
						<td>19</td>
						<td>18292007712</td>
					</tr>
				</tbody>
			</table>
		</section>
	</div>
</template>

<script>
export default {
	data(){
		return{
			
		}
	},
	methods:{
		
	}
}
</script>

<style lang="scss" scoped>
    .container{
    	width:780px;
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
		min-width:780px;


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