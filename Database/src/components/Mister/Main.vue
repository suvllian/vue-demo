<template>
	<div class="container">
		<section>
			<h2>财务部</h2>
			<table border="1">
				<thead>
					<tr>
						<th>部门号</th>
						<th>部门经理</th>
						<th>部门人数</th>
						<th>部门工资</th>
						<th>部门电话</th>
					</tr>
				</thead>

				<tbody>
					<tr>
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
			<h2>市场部</h2>
			<table border="1">
				<thead>
					<tr>
						<th>部门号</th>
						<th>部门经理</th>
						<th>部门人数</th>
						<th>部门工资</th>
						<th>部门电话</th>
					</tr>
				</thead>

				<tbody>
					<tr>
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
			<h2>公关部</h2>
			<table border="1">
				<thead>
					<tr>
						<th>部门号</th>
						<th>部门经理</th>
						<th>部门人数</th>
						<th>部门工资</th>
						<th>部门电话</th>
					</tr>
				</thead>

				<tbody>
					<tr>
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
			<h2>人力资源部</h2>
			<table border="1">
				<thead>
					<tr>
						<th>部门号</th>
						<th>部门经理</th>
						<th>部门人数</th>
						<th>部门工资</th>
						<th>部门电话</th>
					</tr>
				</thead>

				<tbody>
					<tr>
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