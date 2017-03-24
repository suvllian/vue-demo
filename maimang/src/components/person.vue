<template>
	<section id="person" class="slide-new slide-box">
		<div class="section-bg person-bg"></div>

		<div class="section-title white-title">
			<h2 class="section-title-h">
				<span>旗下艺人</span>
			</h2>
		</div>

		<div class="section-inner">	
			<div class="person-intro">
				<div class="person-left">
					<img src="./../assets/person-1-big.jpg">
				</div>

				<div class="person-right">
					<h3 class="person-h">{{ data["person"][0].name }}</h3>
					<p class="person-p" v-html='data["person"][0].intro'></p>
					<ul class="person-img-list">
						<li class="person-item" v-for="item in personpic">
							<img class="person-pic" :src="item.src">
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="slide-action">
			<div class="slide-action-left">
				<a class="slide-action-btn" href="javascript:;">
					<i class="fa fa-angle-left fa-3x"></i>
				</a>
			</div>
			<div class="slide-action-right">
				<a class="slide-action-btn" href="javascript:;">
					<i class="fa fa-angle-right fa-3x"></i>
				</a>
			</div>
		</div>
		
	</section>
</template>

<script>
import api from './../api/';

export default{
	data(){
		return{
			current:1,
			data:[],
			personpic:[],
			isShow:false
		}
	},
	methods:{
		getData(){
			api.getPerson().then(res => {	
				this.data = res.data;
				this.personpic = this.data["personpic"];
			})
		},

		showMask(){
			this.addListener();
			console.log(this.$root);
		},

		addListener(){
			var mask = document.querySelector(".mask");
			var maskContent = document.querySelector(".mask-content img");
			var prev = document.querySelector(".mask-content slide-action-left");
			var next = document.querySelector(".mask-content slide-action-right");

			maskContent.addEventListener("click", function(e){
				document.body.removeChild(mask);
			});
		}
	},

	created(){
		this.getData();
	}
}
</script>