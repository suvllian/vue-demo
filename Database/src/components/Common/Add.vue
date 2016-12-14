<template>
	<section>
		<h2>添加员工</h2>
		<form>
	        <div>
	            <span>姓名</span>
	            <input type="text" placeholder="请输入姓名" name="">
	        </div>

	        <div>
	            <span>性别</span>
	            <select name="">
	                <option selected="selected">男</option>
	                <option>女</option>
	            </select>
	        </div>

	        <div>
	            <span>年龄</span>
	            <input type="text" placeholder="年龄" name="">
	        </div>
	        
	        <div>
	            <span>电话</span>
	            <input type="text" placeholder="电话" name="">
	        </div>
	        
	        <div>
	            <span>部门</span>
	            <select name="">
	                <option selected="selected">市场部</option>
	                <option>人力资源部</option>
	                <option>财务部</option>
	                <option>公关部</option>
	            </select>
	        </div>
	       
	        <div>
	            <span>职位</span>
	            <select name="">
	                <option selected="selected">职位1</option>
	                <option>职位2</option>
	                <option>职位3</option>
	                <option>职位4</option>
	            </select>
	        </div>
	        
	        <div>
	            <input @click.prevent="callback" type="submit" value="提交">
	        </div>
    	</form>
	</section>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		computed: mapState({ user: state => state.user }),
	}
</script>

<style lang="scss" scoped>
    section{
    	width:50%;
    	margin:32px auto 16px;
    	padding:0px 0px 16px;
    	min-height:78vh;
    	box-shadow: 0 5px 5px #a7a7a7;

    	h2{
    		padding:16px 0px;
    		font-weight:400;
    		text-align:center;
    		font-size:28px;
    		background: #337ab7;
		    color: #fff;
		    border-top-left-radius: 10px;
		    border-top-right-radius: 10px;
    	}

    	form{
    		padding-top:48px;
    	}

    	div{
    		padding:8px 0px;
    		width:68%;
    		margin:0 auto;

    		span{
    			width:16%;
    			height:42px;
    			font-size:14px;
    			color:#555;
    			padding: 12px 36px;
    			display:inline-block;
    			background-color:#eee;
    			border-top-left-radius:4px;
    			border-bottom-left-radius:4px;
    		}

    		input[type=text],select{
    			height:42px;
    			width:84%;
    			margin-left:-1%;
    			border:1px solid #eee;
    			box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.075) inset;
			    color: #555;
			    font-size: 14px;
			    padding:0 16px;
			    outline:none;
    		}

    		option{
    			height:42px;
    			border:0px;
    			color: #555;
			    font-size: 14px;
			    padding:0 16px;
			    outline:none;
    		}

    		input[type="submit"]{
				cursor:pointer;
				position: relative;
				color: rgba(255,255,255,1);
				background-color:#aaa;
				font-weight: 500;
				font-size: 1.2em;
				display: block;
				padding: 4px;
				border-radius: 8px;
				box-shadow: 0px 9px 0px #aaa, 0px 9px 25px rgba(0,0,0,.7);
				margin: 60px auto;
				width: 160px;
				text-align: center;
				
				transition: all .1s ease;

				&:active {
					box-shadow: 0px 3px 0px #aaa, 0px 3px 6px rgba(0,0,0,.9);
					position: relative;
					top: 6px;
				}
			}

    	}
    }
</style>