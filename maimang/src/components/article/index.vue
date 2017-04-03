<template>
	<div class="article">
		<div v-html="article.content" class="section-inner">
			
		</div>
	</div>
</template>

<script>
import api from './../../api/';

export default{
	data(){
		return{
			article:[]
		}
	},
	methods:{
		getData(){
			let id = this.$route.query.id;
			api.getArticle(id).then(res => {	
				this.article = res.data[0];
			})
		}
	},

	created(){
		this.getData();
	}
}
</script>