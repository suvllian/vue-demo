<template>
	<section id="hotclass" class="slide-new slide-box">
		<div class="section-title">
			<h2 class="section-title-h">
				<span>热门课程推荐</span>
			</h2>
		</div>

		<div class="section-inner">		
			<div class="slide-animate">
				<ul class="slide-list">
					<li v-for="(item, index) in data" :class="item.className">
						<a :href="item.src" target="_blank">
							<img class="list-pic" :src="'./static/hot-img-' + (index+1) + '.jpg'" :alt="item.intro">
						</a>
					</li>
				</ul>

				<!-- 点prev切换到上一张，next切换到下一张 -->
				<!-- 使用两个隐藏的块布局到指定位置实现 -->
				<div class="left-btn" @click="prev()"></div>
				<div class="right-btn" @click="next()"></div>
				<!-- 点prev切换到上一张，next切换到下一张 -->
				
			</div>
			
			<div class="slide-switch">
				<a class="slide-switch-item" href="" @click.prevent="goIndex(0)">
					<i class="slide-switch-bg switch-active"></i>
				</a>
				<a class="slide-switch-item" href="" @click.prevent="goIndex(1)">
					<i class="slide-switch-bg"></i>
				</a>
				<a class="slide-switch-item" href="" @click.prevent="goIndex(2)">
					<i class="slide-switch-bg"></i>
				</a>
				<a class="slide-switch-item" href="" @click.prevent="goIndex(3)">
					<i class="slide-switch-bg"></i>
				</a>
				<a class="slide-switch-item" href="" @click.prevent="goIndex(4)">
					<i class="slide-switch-bg"></i>
				</a>
			</div>
		</div>

		<div class="slide-action">
			<div class="slide-action-left">
				<a class="slide-action-btn" @click="prev()" href="javascript:;">
					<i class="fa fa-angle-left fa-3x"></i>
				</a>
			</div>
			<div class="slide-action-right">
				<a class="slide-action-btn" @click="next()" href="javascript:;">
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
			index:0,
			handle:null,
			data:[]
		}
	},
	methods: {
		slideImage(){
			let liItem = document.querySelectorAll(".list-item");
			let switchItem = document.querySelectorAll("#hotclass .slide-switch-bg");
			let length = liItem.length;

			// 清除所有样式
			var init = function(){
				for (let i = 0; i < length; i++) {
					liItem[i].className = "list-item";
					switchItem[i].className = "slide-switch-bg";
				}
			}

			// 转换焦点图
			var focus = function(index) {
				init();
				liItem[index].className = "list-item current";
				switchItem[index].className = "slide-switch-bg switch-active";

				liItem[index-1] ? liItem[index-1].className = "list-item prev" :
					liItem[4].className = "list-item prev";
				liItem[index+1].className = "list-item next";
			}

			// 最后一张
			var setLast = function(){
				init();
				liItem[4].className = "list-item current";
				switchItem[4].className = "slide-switch-bg switch-active";

				liItem[3].className = "list-item prev";
				liItem[0].className = "list-item next";
			}

			let prev = null, next = null;

			// 循环变换
			var slide = index => {
				let indexValue = index || this.index;

				if (this.index < 0){
					this.index = 4;
				} else if(this.index > 4){
					this.index = 0;
				}

				indexValue = this.index;
				if (0 <=  indexValue && indexValue < 4 ) {		
					focus(indexValue);	
				} else if (indexValue >= 4){
					setLast();			
				}
				
			}

			return {
				clickBtn:function(){	
					slide();
				},
				slide:() => {
					slide(this.index++);
				}
			}
		},

		// 下一张
		next(){
			this.goIndex(++this.index);
		},

		// 上一张
		prev(){
			this.goIndex(--this.index);
		},

		// 跳转到指定图片
		goIndex(index){
			clearInterval(this.handle);
			this.index = index;
			this.slideImage().clickBtn();
			this.handle = setInterval(this.slideImage().slide, 3000);
		},

		// 获取图片数据，并初始化
		getData(){
			api.getHot().then(res => {	
				this.data = res.data;
				this.data[0].className ="list-item current";
				this.data[1].className ="list-item next";
				this.data[2].className ="list-item";
				this.data[3].className ="list-item";
				this.data[4].className ="list-item prev";
			})
		}
	},
	created(){
		this.getData();
	},

	mounted(){		
		// 节点挂载之后开始循环
		this.handle = setTimeout(this.next, 3000);
	}
}
</script>