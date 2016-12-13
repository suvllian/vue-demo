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
						<th>应扣工资</th>
						<th>加班类别</th>
						<th>加班时间</th>
						<th>津贴</th>
						<th>基本工资</th>		
						<th>总津贴</th>
						<th>扣除</th>
						<th>总工资</th>
						<th>月份</th>
						<th>操作</th>
					</tr>
				</thead>

				<tbody>
					<tr>
						<td>0102</td>
						<td>彭晗</td>
						<td>男</td>
						<td>19</td>
						<td>18292007712</td>
						<td>01</td>
						<td>6次</td>
						<td>5次</td>
						<td>500元</td>
						<td>01</td>
						<td>10小时</td>
						<td>500</td>
						<td>10000</td>
						<td>500</td>
						<td>500</td>
						<td>10000</td>
						<td>12</td>
						<td><a @click.prevent="callback" href="" title="修改">修改</a>/<a @click.prevent="callback" href="" title="删除">删除</a></td>
					</tr>

					<tr>
						<td>0102</td>
						<td>彭晗</td>
						<td>男</td>
						<td>19</td>
						<td>18292007712</td>
						<td>01</td>
						<td>6次</td>
						<td>5次</td>
						<td>500元</td>
						<td>01</td>
						<td>10小时</td>
						<td>500</td>
						<td>10000</td>
						<td>500</td>
						<td>500</td>
						<td>10000</td>
						<td>12</td>
						<td><a href="" title="">修改</a>/<a href="" title="">删除</a></td>
					</tr>

					<tr>
						<td>0102</td>
						<td>彭晗</td>
						<td>男</td>
						<td>19</td>
						<td>18292007712</td>
						<td>01</td>
						<td>6次</td>
						<td>5次</td>
						<td>500元</td>
						<td>01</td>
						<td>10小时</td>
						<td>500</td>
						<td>10000</td>
						<td>500</td>
						<td>500</td>
						<td>10000</td>
						<td>12</td>
						<td><a href="" title="">修改</a>/<a href="" title="">删除</a></td>
					</tr>

					<tr>
						<td>0102</td>
						<td>彭晗</td>
						<td>男</td>
						<td>19</td>
						<td>18292007712</td>
						<td>01</td>
						<td>6次</td>
						<td>5次</td>
						<td>500元</td>
						<td>01</td>
						<td>10小时</td>
						<td>500</td>
						<td>10000</td>
						<td>500</td>
						<td>500</td>
						<td>10000</td>
						<td>12</td>
						<td><a href="" title="">修改</a>/<a href="" title="">删除</a></td>
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

    table {
		border: 2px solid #42b983;
		border-radius: 3px;
		background-color: #fff;
		margin:0 auto;


		th, td {
		  
		   padding: 10px 6px;
		   font-size:18px;
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