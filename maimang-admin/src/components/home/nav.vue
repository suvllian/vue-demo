<template>
	<aside class="menu">
		<div>
			<nav>
				<ul>
					<li v-for="item in menu" class="nav-item">
						<router-link class="nav-item-a" v-bind:to="item.src">{{ item.title }}</router-link>
					</li>
				</ul>
			</nav>
		</div>
	</aside>
</template>

<script>
export default{
	data(){
		return{
			menu:[
				{ title:"使用说明", src:"/index"},
				{ title:"首屏管理", src:"/album"},
				{ title:"热门课程", src:"/hot"},
				{ title:"明星导师", src:"/teacher"},
				{ title:"专业设置", src:"/class"},
				{ title:"旗下艺人", src:"person"},
				{ title:"订阅邮箱", src:"/email"},
				{ title:"咨询预约", src:"/join"},
			]
		}
	}
}
</script>

<style lang="scss">
	.menu{
		width: 20%;
		min-width: 250px;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		padding: 36px;
		background-color: #eee;
		box-shadow:0px 5px 5px 5px #ccc;
	}

	.nav-item{
		width: 100%;
		margin-bottom: 10px;
		border-radius: 5px;
		background-color:#41b35d;
		text-align: center;
		list-style: none;
	}

	.nav-item-a{
		width: 100%;
		height: 100%;
		padding:16px 0;
		display: block;
		font-size: 18px;
		outline: none;
		letter-spacing: 2px;
		text-decoration: none;
		color: #fff;
	}
</style>