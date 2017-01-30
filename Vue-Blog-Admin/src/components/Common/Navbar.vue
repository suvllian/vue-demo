<template>
	<aside>
		<div class="container">
			<div class="nav-header">
				<h1 id="logo"><a v-bind:href="logo.src">{{logo.title}}</a></h1>

				<nav>
					<ul v-for="single in menu">	
						<h2><span @click="showItem(single)">{{single.father}}</span></h2>
						<div v-bind:class="{hide:true,show:single.isShow}" >
							<li v-for="item in single.items">
								<router-link v-bind:to="item.src">{{item.title}}</router-link>
							</li >
						</div>
					</ul>
				</nav>
			</div>
		</div>
	</aside>
</template>

<script>
export default{
	data(){
		return{
			isShow:false,
			logo:{
				title:"Suvllian",
				src:"http://suvllian.com"
			},
			menu:[
				{
					father:"人在旅途",isShow:false,
					items:[
						{title:"添加图片",src:'/tImage'},
						{title:"图片管理",src:'/tView'}
					]
				},
				{
					father:"书籍管理",isShow:false,
					items:[
						{title:"添加书籍",src:'/bIndex'},
						{title:"图书管理",src:'/bView'}
					]
				},
				{
					father:"文章管理",isShow:false,
					items:[
						{title:"添加文章",src:'/aIndex'},
						{title:"文章管理",src:'/aView'}
					]
				}
			
			]
		}
	},
	methods:{
		showItem:function(item){
			item.isShow = !item.isShow;
		}
	}
}
</script>

<style lang="scss" scoped>
	.hide{
		height:0;
		overflow:hidden;
		transition:0.5s all ease-out;
	}

	.show{
		height: 100px;
	}

    aside{
    	width: 13.6%;
    	height: 100%;
    	box-sizing:border-box;
    	padding:64px 48px;
    	position: fixed;
    	top: 0;
    	left: 0;

    	background-color: #E6E6E6;

    	h1{
    		text-align: center;
    	}

    	h2{
    		font-weight: 500;
    		padding:8px;
    		cursor: pointer;
    		border-bottom:1px solid #aaa;
    	}

    	nav{
    		margin:16px 0;

    		ul{

    			li{
    				padding:10px;
    				font-size: 18px;
    				margin:2px 0px;

    				a{
    					text-decoration: none;
    					color: #333;
    				}
    			}
    		}
    	}
    }
</style>