<template>
	<section id="class" class="slide-new slide-box">
		<div class="section-title">
			<h2 class="section-title-h">
				<span>专业设置</span>
			</h2>
		</div>

		<div class="section-inner">
			<div class="class-intro">
				<h2 class="class-intro-h">明星导师亲自授课，你值得拥有！</h2>
				<p class="class-intro-p">我们的课程模式是通过导师亲自教学，学员自主练习等等等等。</p>
				<p class="class-intro-p">记录你想听的、在听的和听过的唱片，顺便打分，添加标签及个人附注、写评论。</p>
				<p class="class-intro-p">根据你的口味，豆瓣会推荐合适的唱片给你。</p>
				<p class="class-intro-more"><span>点击图标了解课程详情&nbsp;&nbsp; ></span></p>
			</div>
			<div class="class-list">
				<ul class="class-ul">
					<li class="class-item" v-for="item in data">
						<a :href="item.src" target="_blank"><img class="class-pic" :src="'./static/img/class-img-' + item.id + '.png'"></a>
					</li>
				</ul>
			</div>
		</div>		
	</section>
</template>

<script>
import api from './../../api/';

export default{
	data(){
		return{
			data:[]
		}
	},
	methods:{
		getData(){
			api.getClass().then(res => {	
				this.data = res.data;
			})
		}
	},

	created(){
		this.getData();
	}
}
</script>