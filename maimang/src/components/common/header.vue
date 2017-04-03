<template>
	<header>
		<div class="header">
			<div class="header-top">
				<h1>
					<a href="">
						<img src="./../../assets/logo.png" alt="首页" class="logo">
					</a>
				</h1>
				<ul class="top-nav">
					<li><a id="item-1" class="top-nav-link top-nav-link-active" href="">关于麦芒</a></li>
					<li><a id="item-2" class="top-nav-link" href="#album">活动公告</a></li>
					<li><a id="item-3" class="top-nav-link" href="#teacher">明星导师</a></li>
					<li><a id="item-4" class="top-nav-link" href="#join">在线报名</a></li>
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
					<li class="nav-item"><a href="#hotclass" title="热门课程推荐">热门课程推荐</a></li>
					<li class="nav-item"><a href="#teacher" title="明星导师">明星导师</a></li>
					<li class="nav-item"><a href="#class" title="专业设置">专业设置</a></li>
					<li class="nav-item"><a href="#person" title="旗下艺人">旗下艺人</a></li>
					<li class="nav-item" @click="showMask()"><a href="#" title="新闻">新闻</a></li>
					<li class="nav-item"><a href="#join-title" title="预约报名">预约报名</a></li>
					<li class="nav-item"><a href="#about" title="联系我们">联系我们</a></li>
				</ul>
			</nav>
		</div>
	</header>
</template>

<script>
import api from './../../api/';
import { escape } from './../../utils/effect.js';
import { insertNode } from './../../utils/createMask.js';

export default{
	methods: {
		focus(){
			// 设置邮件表单边框颜色，获取焦点变绿，失去焦点恢复。
			var input = document.querySelector(".sub-input");

			input.addEventListener("focusin",function(){
				input.style.border = "1px solid #41b25d";
			})

			input.addEventListener("focusout",function(){
				input.style.border = "1px solid #c9c9c9";
			})		
		},

		submit(){
			// 订阅邮箱表单提交
			var email = this.$refs.email;
			if (!email) {
				return ;
			}
			// 字符转码
			var result = escape(email.value);
			api.postEmail(result).then(res => {
				if (res.data == 1){
					email.value = "订阅成功";
				} else {
					email.value = "订阅失败，请重试";
				}
			})
		},

		overNav(){
			let nav = document.querySelector(".top-nav");
			let item1 = document.querySelector("#item-1");
			let item2 = document.querySelector("#item-2");
			let item3 = document.querySelector("#item-3");
			let item4 = document.querySelector("#item-4");

			nav.addEventListener("mouseover", e => {
				resetColor();
				e.target.className = "top-nav-link top-nav-link-active";
			});

			nav.addEventListener("mouseleave", e => {
				resetColor();
				item1.className = "top-nav-link top-nav-link-active";
			})

			// 四个菜单栏颜色重置
			function resetColor() {
				[item1, item2, item3, item4].forEach((item) => {
					item.className = "top-nav-link";
				});
			}
		},

		showMask(){
			let html = '<div class="mask-contain">\
								<div class="mask-news">\
									<div class="erweima">\
										<img src="./static/img/erweima-1.jpg">\
										<p>麦芒音乐微信号(活动)</p>\
									</div>\
									<div class="erweima">\
										<img src="./static/img/erweima-2.jpg">\
										<p>麦芒音乐微博(资讯)</p>\
									</div>\
								</div>\
							</div>';
			let removeNode = insertNode(html);

			// 获取弹出层的节点
			let maskContent = document.querySelector(".mask-news");
			let mask = document.querySelector("#mask");

			// 直接写并不会出现动画效果，需要使用定时器。
			// 目测是弹出层还没有渲染top就被修改为50%，所以无法出现动画效果。
			setTimeout(()=> {
				maskContent.style.top = "0%";
			}, 0);

			// 如果只设置一个点击事件，则弹出层一出现就隐藏
			mask.addEventListener("click", removeNode);
		}
	},
	mounted(){
		this.focus();
		this.overNav();
	}

}
</script>