<template>
	<header>
		<div class="header">
			<div class="header-top">
				<h1>
					<a href="">
						<img src="./../assets/logo.png" alt="首页" class="logo">
					</a>
				</h1>
				<ul class="top-nav">
					<li><a class="top-nav-link top-nav-link-active" href="">关于麦芒</a></li>
					<li><a class="top-nav-link" href="#album">活动公告</a></li>
					<li><a class="top-nav-link" href="#teacher">明星导师</a></li>
					<li><a class="top-nav-link" href="#join">在线报名</a></li>
				</ul>
				<div class="sub">
					<div class="sub-input">
						<input type="text" ref="email" value="" placeholder="订阅麦芒咨询">
						<button @click="submit">
							<i class="fa fa-envelope-o fa-2x"></i>
						</button>
					</div>
				</div>
			</div>
			<nav class="nav">
				<ul>
					<li class="nav-item"><a href="#" title="首页">首页</a></li>
					<li class="nav-item"><a href="#" title="热门推荐">热门推荐</a></li>
					<li class="nav-item"><a href="#teacher" title="明星导师">明星导师</a></li>
					<li class="nav-item"><a href="#class" title="课程设置">课程设置</a></li>
					<li class="nav-item"><a href="#person" title="旗下艺人">旗下艺人</a></li>
					<li class="nav-item"><a href="#" title="新闻">新闻</a></li>
					<li class="nav-item"><a href="#join" title="联系我们">联系我们</a></li>
				</ul>
			</nav>
		</div>
	</header>
</template>

<script>
import api from './../api/';
import { escape } from './../utils/effect.js';

export default{
	methods: {
		focus(){
			var input = document.querySelector(".sub-input");

			input.addEventListener("focusin",function(){
				input.style.border = "1px solid #41b25d";
			})

			input.addEventListener("focusout",function(){
				input.style.border = "1px solid #c9c9c9";
			})		
		},

		submit(){
			var email = this.$refs.email;
			var result = escape(email.value);
			api.postEmail(result).then(res => {
				if (res.data == 1){
					email.value = "订阅成功";
				} else {
					email.value = "订阅失败，请重试";
				}
			})
		}
	},
	mounted(){
		this.focus();
	}

}
</script>