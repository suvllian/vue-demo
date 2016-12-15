<template>
	<div class="container">
		<section>
			<h2>修改基本信息</h2>
			
			<p>姓名：</p>
			<input type="text" v-model="form.name" placeholder="请输入姓名">
			<p>年龄：</p>
			<input type="text" v-model="form.age" placeholder="请输入年龄">
			<p>电话：</p>
			<input type="text" v-model="form.tel" placeholder="请输入电话">
			<input @click="updateInfor()" type="submit" value="确认修改">
			
		</section>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	
	export default {
		computed: mapState({ user: state => state.user }),
		data(){
			return{
				form:{
					name:"",
					age: null ,
					tel: null
				}
			}
		},
		methods:{
			updateInfor:function(){
				if(!this.form.name||!this.form.age||!this.form.tel||!this.user.id){ return; };
				var url = this.$root.url + "deal.php";
				var xhr = new XMLHttpRequest();
	            xhr.open('POST',url);
				var postData = "id=" + this.user.id + "&name=" + this.form.name +
								"&age=" + this.form.age + "&tel=" + this.form.tel + "&type=update";
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
	            var that = this; 
	            xhr.onload = function(e){
	                
	            }
	            xhr.send(postData);
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

    input[type="text"]{
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