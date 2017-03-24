<template>
	<section id="teacher" class="slide-new slide-box">
		<div class="section-bg teacher-bg"></div>

		<div class="section-title white-title">
			<h2 class="section-title-h">
				<span>明星导师</span>
			</h2>
		</div>

		<div class="section-inner">
			
			<div class="teacher-list" ref="list">
				<ul>
					<li class="teacher-list-item" v-for="(item, index) in teachers">
						<div class="teacher-item-box">
							<div class="teacher-img">
								<img class="teacher-pic" :src="item.src">
							</div>
							<div class="teacher-intro">
								<h4 class="teacher-intro-h">{{item.name}}</h4>
								<p class="teacher-intro-p">{{item.intro}}</p>
							</div>
						</div>
					</li>
				</ul>
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
			teachers:[],
			current:1
		}
	},

	methods:{
		prev(){
			var list = this.$refs.list;
			if (this.current == 1) {
				this.current = 3;
			} else {
				this.current--;
			}
			this.slideImage();
		},
		next(){
			var list = this.$refs.list;
			if (this.current == 3) {
				this.current = 1;
			} else{
				this.current++;
			}
			this.slideImage();
		},
		slideImage(){	
			var list = this.$refs.list;	
			list.style.left = (-100 * this.current + 100) + "%";
		},
		getData(){
			api.getTeacher().then(res => {	
				this.teachers = res.data;
			})
		}
	},

	created(){
		this.getData();
	}
}

</script>