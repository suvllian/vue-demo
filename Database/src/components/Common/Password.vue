<template>
	<div class="container">
		<section>
			<h2>{{title}}</h2>
			
			<p>原密码：</p>
			<input type="password" v-model="form.original" placeholder="请输入原密码">
			<p>新密码：</p>
			<input type="password" v-model="form.new" placeholder="请输入新密码">
			<p>再次输入新密码：</p>
			<input type="password" v-model="form.rePost" placeholder="请再次输入新密码">
			<input @click="cPassword()" type="submit" value="确认修改">
			
		</section>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	
	export default {
		computed: mapState({ user: state => state.user }),
		data(){
			return{
				title:"修改密码",
				form:{
					original:"",
					new: null ,
					rePost: null
				}
			}
		},
		methods:{
			cPassword:function(){

				if(!this.form.original||!this.form.new||!this.form.rePost||!this.user.id){ 
					this.title = "请输入完整信息！";
					return; 
				};
				if(this.form.new!=this.form.rePost){
					this.title = "两次输入的新密码不一致！";
					return;
				}

				var jsonData = {
					id : this.user.id,
					type : "cpass",
                    original : this.form.original,
                    new : this.form.new
				}

				var url = "deal.php";
				var that = this;
                this.$root.getPostData(jsonData,url).then(function (res) {
                	var response  = res.data;
	               if(response === "1"){
	                	that.title = "初始密码错误！";
	                }else if(response === "2"){
	                    that.title = "修改成功！";
	                }else{
	                    that.title = "修改失败，请重试";
	                }
                },function (res) {
                    console.log(res.data);
                });
			}
		},
		created(){
			if(!this.user.id){
				this.$router.replace({ path: '/' });
			}
		}
	}
</script>

<style lang="scss" scoped>
    .container{
    	width:50%;
    	padding:32px 80px 0px;
    	position:relative;
    	margin:1em auto 3em;
    	min-height:74vh;
    	box-shadow: 0 5px 5px #a7a7a7;
    }

    h2{
    	font-size:26px;
    	font-weight:400;
    	margin:16px 0;
    	color:#333;
    	text-align:center;
    }

    section{
    	padding:32px 0px;
    }

    p{
    	color:#444;
    	font-size:1.1em;
	    font-family: "PT Serif",serif;
	    margin-top:1em;
    }

    input[type="password"]{
	    background: #fff none repeat scroll 0 0;
	    border: 1px solid #dadada;
	    border-radius: 30px;
	    margin: 0.6em 0;
	    outline: medium none;
	    padding: 0.8em 1.2em;
	    width: 100%;
	    font-size:16px;
	}

	input[type="submit"]{
		cursor:pointer;
		position: relative;
		color: rgba(255,255,255,1);
		background-color:#aaa;
		font-weight: 500;
		font-size: 1.2em;
		display: block;
		padding: 4px;
		border-radius: 8px;
		box-shadow: 0px 9px 0px #aaa, 0px 9px 25px rgba(0,0,0,.7);
		margin: 100px auto;
		width: 160px;
		text-align: center;
		
		transition: all .1s ease;

		&:active {
			box-shadow: 0px 3px 0px #aaa, 0px 3px 6px rgba(0,0,0,.9);
			position: relative;
			top: 6px;
		}
	}
</style>