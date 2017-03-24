<template>
	<section id="join" class="slide-new slide-box">
		<div class="section-bg join-bg"></div>	
		<div class="section-inner">	
			<div class="join-form">
				<form action="" method="post" accept-charset="utf-8">
					<div class="input-radio">
						<label><i class="fa fa-circle"></i><span class="radio-text">咨询课程信息</span></label>
						<label><i class="fa fa-circle-o"></i><span class="radio-text">预约明星课程</span></label>
					</div>
					
					<div class="input-item" v-for="item in inputItems">
						<input class="input-text" type="text" v-model="form[item.model]" :placeholder="item.placeholder">
					</div>

					<div class="submit" @click="submit">
						<p ref="submit">发送要求</p>
					</div>

					<div class="define">
						<p><i class="fa fa-circle"></i><span class="radio-text">允许麦芒通过电子邮件给您发送最新资讯</span></p>
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
				email:""
			},
			inputItems:[
				{ model: "name" , placeholder:"您的姓名"}, 
				{ model: "company" , placeholder:"单位或学校"}, 
				{ model: "teacher" , placeholder:"预约的专业或导师"}, 
				{ model: "email" , placeholder:"电话/邮箱"}
			]
		}
	},

	methods:{
		submit(){
			var submitBtn = this.$refs.submit;
			var form = this.form;
			if (!(form.name && form.company && form.teacher && form.email)) {
				submitBtn.innerHTML = "请填写完整内容";
				resetBtn();
				return;
			}

			api.postJoin(form).then(res => {
				if (res.data == 1){
					submitBtn.innerHTML = "发送成功";
					resetForm();
					resetBtn();
				} else {
					submitBtn.innerHTML = "发送失败，请重试";
					resetBtn();
				}
			});

			var resetBtn = function(){
				setTimeout(function(){
					submitBtn.innerHTML = "发送要求";
				}, 2000);
			}

			var resetForm = function(){
				form.name = "";
				form.company = "";
				form.teacher = "";
				form.email = "";
			}
		}
	}
}

</script>
