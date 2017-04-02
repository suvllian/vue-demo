<template>
	<div>
		<Nav></Nav>
		<div class="container">
			<section>
				<h3 class="container-h">
					<span>添加详情页</span>
				</h3>
			</section>
			<div class="article">
				<label for="article-title">文章标题</label>
				<input type="text" id="article-title" v-model="title">
			</div>
			<script id="editor" type="text/plain" style="width:1024px;height:66vh;"></script>
			<button class="blue-Btn" @click.prevent="getEditor()">提交</button>
		</div>
	</div>
</template>

<script>
import Nav from './../home/nav.vue';
import { mapActions, mapState} from 'vuex';
import { ADD_ARTICLE } from './../../vuex/type.js';
const UE = require('UE');

export default {
    components: { Nav },
	data:() => (
	    {
	        editor: null,
	        title:""
	    }
    ),
	methods: {
		...mapActions([ADD_ARTICLE]),
		getEditor() {
			if (this.title && this.editor.getContent()) {
				if (confirm("确认提交")) {
					this.ADD_ARTICLE(this.title, this.editor.getContent());
				}
			}
		},
	},
	mounted() {
		this.editor = UE.getEditor('editor');
	},
	destroyed() {
		this.editor.destroy();
	},
}
</script>