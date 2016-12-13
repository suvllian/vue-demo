<template>
	<section>
		<h2>西安渭梦网络科技有限公司欢迎您！</h2>
		<div v-for="item in items">
			<router-link v-bind:to="item.src"><p>{{item.title}}</p></router-link>
		</div>
	</section>
</template>

<script>

export default{
	data(){
		return{
			items:[
			{title:"员工登录",src:"/staff/home"},
			{title:"经理登录",src:"/manager/home"},
			{title:"Boss登录",src:"/mister/home"}
			]
		}
	},
	methods:{
	   
	}
}
</script>

<style lang="scss" scoped>
    section{
    	width:50%;
    	margin:0 auto;
    	padding:28px;
    	min-height:82vh;

    	h2{
    		font-weight:400;
    		text-align:center;
    		letter-spacing:1px;
    		font-size:28px;
    		padding:12px 0;
    	}

    	div{
    		width:50%;
    		height:168px;
    		margin:8px auto 32px;
    		border-radius:10px;
    		opacity:0.6;
    		transition:1s all ease;

    		&:nth-child(2){
    			background-color:#7fdbff;
    		}

    		&:nth-child(3){
    			background-color:#ddd;
    		}

    		&:nth-child(4){
    			background-color:#b3d9d9;
    		}

    		&:hover{
    			opacity:1;
    		}
    	}
 

    	p{
    		line-height:168px;
    		position:relative;
    		width:148px;
    		left:50%;
    		margin-left:-74px;
    		letter-spacing:4px;
    		color:#fff;
    		font-size:32px;
    		outline: none;
    	}

    	a{
    		outline: none;
    	}
    }
</style>