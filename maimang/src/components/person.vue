<template>
	<section id="person" class="slide-new slide-box">
		<div class="section-bg person-bg"></div>

		<div class="section-title white-title">
			<h2 class="section-title-h">
				<span>旗下艺人</span>
			</h2>
		</div>

		<div class="section-inner">	
			<div class="person-intro" v-for="(item, index) in data">
				<div class="person-left">
					<img :src="'./static/person-' + item.id + '-big.jpg'">
				</div>

				<div class="person-right">
					<h3 class="person-h">{{ item.name }}</h3>
					<p class="person-p" v-html='item.intro'></p>
					<ul class="person-img-list">
						<li class="person-item" v-for="single in 6" @click="showMask(index, single)">
							<img class="person-pic" :src="'./static/person-' + item.id + '-' + single + '.jpg'">
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
import { createMask } from './../utils/createMask.js';

export default{
	data(){
		return{
			data:[]
		}
	},
	methods:{
		getData(){
			api.getPerson().then(res => {	
				this.data = res.data;
			})
		},

		showMask(big, small){
			big = big + 1;
			let html = '<div class="mask-contain">\
							<div class="mask-image" id="mask-image">\
								<a href="http://suvllian.com" target="_blank"><img src="./static/person-' + big + '-'+ small + '.jpg"></a>\
							</div>\
							<div class="slide-action">\
								<div class="slide-action-left">\
									<a class="slide-action-butn" id="left" href="javascript:;">\
										<i class="fa fa-angle-left fa-3x"></i>\
									</a>\
								</div>\
								<div class="slide-action-right">\
									<a class="slide-action-butn" id="right" href="javascript:;">\
										<i class="fa fa-angle-right fa-3x"></i>\
									</a>\
								</div>\
							</div>\
						</div>';
			createMask(html);

			let leftBtn = document.querySelector("#left");
			let rightBtn = document.querySelector("#right");
			let img = document.querySelector("#mask-image img");

			function prev(){
				if (small == 1) {
					small = 6;
				} else {
					small = small - 1;
				}
				img.src = './static/person-' + big + '-' + small + '.jpg';
			}

			function next() {
				if (small == 6) {
					small = 1;
				} else {
					small = small + 1;
				}
				img.src = './static/person-' + big + '-' + small + '.jpg';
			}

			leftBtn.addEventListener("click", prev);
			rightBtn.addEventListener("click", next);
		},
	},

	created(){
		this.getData();
	}
}
</script>