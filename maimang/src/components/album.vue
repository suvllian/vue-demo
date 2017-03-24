<template>
	<section id="album" class="slide-new slide-box">
		<div class="section-bg album-bg">
			<ul class="album-bg-list">
				<li class="bg-item" v-for="item in data">
					<img class="bg-pic" :src="item.src">
				</li>
			</ul>
		</div>

		<div class="section-inner">
			<div class="album-content">
				<ul class="album-content-list">
					<li class="content-item" v-for="item in data">
						<div>
							<img class="content-img" src="./../assets/album-content-1.png">
							<h1 class="content-h">{{ item.intro }}</h1>
						</div>
					</li>
				</ul>
			</div>
			<div class="slide-switch">
				<a class="slide-switch-item" href="" @click.prevent="goIndex(0)">
					<i class="slide-switch-bg slide-switch-active"></i>
				</a>
				<a class="slide-switch-item" href="" @click.prevent="goIndex(1)">
					<i class="slide-switch-bg"></i>
				</a>
				<a class="slide-switch-item" href="" @click.prevent="goIndex(2)">
					<i class="slide-switch-bg"></i>
				</a>
			</div>
		</div>

		<div class="slide-action">
			<div class="slide-action-left">
				<a class="slide-action-btn" href="javascript:;" @click="prev()">
					<i class="fa fa-angle-left fa-3x"></i>
				</a>
			</div>
			<div class="slide-action-right">
				<a class="slide-action-btn" href="javascript:;" @click="next()">
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
			albumHandle: null,
			contentHandle: null,
			timeHandle: null,
			switchHandle:null,
			data:[]
		}
	},
	methods:{
		prev(){
			clearInterval(this.timeHandle);
			if (this.current == 1) {
				this.current = 3;
			} else{
				this.current--;
			}
			this.slideImage();
			this.timeHandle = setInterval(this.slideImage, 5000);
		},

		next(){
			clearInterval(this.timeHandle);
			if (this.current == 3) {
				this.current = 1;
			} else{
				this.current++;
			}
			this.slideImage();
			this.timeHandle = setInterval(this.next, 5000);
		},

		goIndex(index){
			clearInterval(this.timeHandle);
			this.current = index + 1;
			this.slideImage();
			this.timeHandle = setInterval(this.slideImage, 5000);
		},

		slideImage(){		
			this.albumHandle.style.left = (-100 * this.current + 100) + "%";
			this.contentHandle.style.left = (-100 * this.current + 100) + "%";
			this.showButton();	
		},

		showButton(){
			for (let i = 0; i < 3; i++){
				this.switchHandle[i].className = "slide-switch-bg";
			}
			this.switchHandle[this.current-1].className = "slide-switch-bg slide-switch-active";
		},

		getData(){
			api.getAlbum().then(res => {	
				this.data = res.data;
			})
		}
	},

	mounted(){
		this.albumHandle = document.querySelector(".album-bg-list");
		this.contentHandle = document.querySelector(".album-content-list");
		this.switchHandle = document.querySelectorAll(".slide-switch-bg");
		setTimeout(this.next, 5000);
		var album  = document.getElementById("album");
		var albumInner = document.querySelector("#album .section-inner");
		var height = document.documentElement.clientHeight - 141;
		album.style.height = height + 'px';
		albumInner.style.height = height - 70 + 'px';

		this.getData();
	}
}
</script>