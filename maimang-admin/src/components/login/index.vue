<template>
	<div class="login">
		<div class="login-box">		
			<div>
				<h3 class="login-h">后台管理中心</h3>
				<form @submit.prevent="ADMIN_LOGIN(form)">
					<input type="text" class="input-item" placeholder="请输入账号" v-model="form.name">
					<input type="password" class="input-item" placeholder="请输入密码" v-model="form.pass">
					<input type="submit" class="submit-btn" value="登陆">
				</form>	
			</div>
		</div>
	</div>
</template>


<script>
import { mapActions, mapState} from 'vuex'
import { ADMIN_LOGIN } from './../../vuex/type.js'

export default{
	computed: mapState({ 
		form: store => store.Login.form,
		userInfo: store => store.Login.userInfo
	}),
	methods:{
		...mapActions([ADMIN_LOGIN])
	},
	watch:{
		userInfo:function(){
			this.$router.replace("index");
		}
	}
}
</script>