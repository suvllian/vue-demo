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
						<p>发送要求</p>
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
import api from './../../api/';
import { escape } from './../../utils/effect.js';
import { insertNode } from './../../utils/createMask.js';

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

			/* 字符串过滤处理，防止XSS */
			["name", "company", "teacher", "email"].forEach((item) => {
				form[item] = escape(form[item]);
			});
			/* 字符串过滤处理，防止XSS */
			
			api.postJoin(form).then(res => {
				if (res.data == 1){
					this.showMask("发送成功")
					resetForm();
				} else {
					this.showMask("发送失败，请重试")
				}
			});

			function resetForm(){
				["name", "company", "teacher", "email"].forEach((item) => {
					form[item] = ""
				});
			}
		},

		showMask(infor){
			let html = '<div class="mask-contain">\
							<div class="mask-alert"><p>' +
								   infor + 
							'</p></div>\
						</div>';
			let removeNode = insertNode(html);

			// 获取弹出层重点的节点
			let maskContent = document.querySelector(".mask-alert");
			let mask = document.querySelector("#mask");

			// 直接写并不会出现动画效果，需要使用定时器。
			// 目测是弹出层还没有渲染top就被修改为50%，所以无法出现动画效果。
			setTimeout( ()=> {
				maskContent.style.top = "50%";
			}, 0);

			mask.addEventListener("click", removeNode);
		}
	}
}

</script>
