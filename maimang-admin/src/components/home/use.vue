<template>
	<div v-if="userInfo.admin">
		<Nav></Nav>
		<div class="container">
			<section>
				<h3 class="container-h">
					<span>使用说明</span>
				</h3>

				<p class="container-p">1、更换图片时请确定分辨率及宽高合适。</p>
				<p class="container-p">2、文字默认不换行，请在需要换行的位置添加“ &lt;br/&gt; ”。</p>
				<p class="container-p">3、点击图片即可上传替换，上传成功无提醒，上传失败提示上传失败。</p>
				<p class="container-p">4、所有操作在操作成功时没有提示，操作失败时提示操作失败。</p>
			</section>
		</div>
	</div>
</template>

<script>
import Nav from './nav.vue';
import { mapState} from 'vuex'

export default {
    components: { Nav },
    computed: mapState({ 
	    userInfo: store => store.Login.userInfo
    }),
    created(){
		if (!this.userInfo.admin) {
			this.$router.replace("login");
			return;
		}
	}
}
</script>