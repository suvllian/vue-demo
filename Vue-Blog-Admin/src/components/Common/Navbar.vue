<template>
	<aside class="nav">
		<nav>
			<ul>	
				<li class="nav-item" v-for="item in menu">
					<router-link :to="item.src">{{ item.title }}</router-link>
				</li >
			</ul>
		</nav>
	</aside>
</template>

<script>
export default{
	data(){
		return{
			menu:[
				{title:"添加图片", src:'/tImage'},
				{title:"图片管理", src:'/tView'},
				{title:"添加书籍", src:'/bIndex'},
				{title:"图书管理", src:'/bView'},
				{title:"添加文章", src:'/aIndex'},
				{title:"文章管理", src:'/aView'}		
			]
		}
	}
}
</script>