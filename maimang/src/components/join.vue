<template>
	<section id="join" class="slide-new slide-box">
		<div class="section-bg join-bg"></div>	
		<div class="section-inner">	
			<div class="join-form">
				<form action="" method="post" accept-charset="utf-8">
					<div class="input-radio">
						<label><i class="fa fa-circle"></i><span class="radio-text">咨询课程信息</span></label>
					</div>
					
					<div class="input-item" v-for="item in inputItems">
						<input class="input-text" type="text" v-model="form[item.model]" :placeholder="item.placeholder">
					</div>

					<div class="submit" @click="submit">
						<p ref="submit">发送要求</p>
					</div>

					<div class="define">
						<p @click="form.allow=!form.allow"><i class="fa fa-circle-o" v-if="!form.allow"></i><i class="fa fa-circle" v-if="form.allow"></i><span class="radio-text">允许麦芒通过电子邮件给您发送最新资讯</span></p>
					</div>
				</form>
			</div>
		</div>
	</section>
</template>

<script>
import api from './../api';

export default{
	data(){
		return{
			form:{
				name:"",
				company:"",
				teacher:"",
				email:"", 
				allow: false
			},

			inputItems:[
				{ model: "name" , placeholder:"您的姓名"}, 
				{ model: "company" , placeholder:"单位或学校"}, 
				{ model: "teacher" , placeholder:"预约的专业或导师"}, 
				{ model: "email" , placeholder:"电话/邮箱"}
			],
			
		}
	},

	methods:{
		submit(){
			var submitBtn = this.$refs.submit;
			var form = this.form;
			if (!(form.name && form.company && form.teacher && form.email)) {
				this.showMask("请填写完整内容")
				return;
			}
			if (form.allow) {
				form.allowSend = 1;
			} else {
				form.allowSend = 0;
			}
			api.postJoin(form).then(res => {
				if (res.data == 1){
					this.showMask("发送成功")
					resetForm();
				} else {
					this.showMask("发送失败，请重试")
				}
			});

			function resetForm(){
				form.name = "";
				form.company = "";
				form.teacher = "";
				form.email = "";
			}
		},

		showMask(infor){
			let body = document.body;

			// 创建节点，插入<body>中。
			let div = document.createElement("div");
			div.id = "mask";
			div.innerHTML = '<div class="mask-contain">\
								<div class="mask-content">\
								</div>\
							</div>';
			body.appendChild(div);

			// 获取弹出层重点的节点
			let maskContent = document.querySelector(".mask-content");
			let mask = document.querySelector("#mask");

			maskContent.innerHTML = "<p>" + infor + "</p>"

			// 直接写并不会出现动画效果，需要使用定时器。
			// 目测是弹出层还没有渲染top就被修改为50%，所以无法出现动画效果。
			setTimeout( ()=> {
				maskContent.style.top = "50%";
			}, 0);

			// 如果只设置一个点击事件，则弹出层一出现就隐藏
			mask.addEventListener("click", addListener);

			function addListener(){

				// 添加监听事件，再点击则移除弹出层
				mask.addEventListener("click", hideMask(div));

				// 删除刚才的监听事件
				mask.removeEventListener("click", addListener);

				// 隐藏弹出层
				function hideMask(node) {
					body.removeChild(node);
				}
			}
	
		}
	}
}

</script>
