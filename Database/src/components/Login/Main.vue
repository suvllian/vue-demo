<template>
	<section>
		<h2>{{title}}</h2>
        
		<div v-if="!isLoginOut" class="login">
			<a @click="showLogin"><p>登录</p></a>
		</div>
        <div v-else>
            <div class="form">
                <h2>登录</h2>
                <input type="text" placeholder="请输入工号" v-model="form.id">
                <input type="password" placeholder="请输入密码" v-model="form.password">
                <input type="submit" value="Submit" @click="submit()">
            </div>
        </div>
	</section>
</template>

<script>
    import { mapActions } from 'vuex'
    import { USER_SIGNIN } from './../../vuex/user'

export default{
	data(){
		return{
            title:"西安渭梦网络科技有限公司欢迎您！",
			isLoginOut:false,
            form:{
                id:'',
                password:''
            },
            rank:Number
		}
	},
	methods:{
	   showLogin:function(){
            this.isLoginOut = !this.isLoginOut;
       },
       ...mapActions([USER_SIGNIN]),
        submit:function(){
           if(!this.form.id || !this.form.password){
                this.title = "请填写完整的信息！";
                return ;
           }
            this.USER_SIGNIN(this.form)

            var url = this.$root.url + "deal.php";
            var postData = "id=" + this.form.id + "&password=" + this.form.password + "&type=login";
            var xhr = new XMLHttpRequest();
            xhr.open('POST',url);
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
            
            var that = this; 
            xhr.onload = function(e){
                if(this.response === "1"){

                    // 员工
                    that.rank = 1;
                    that.$router.replace({ path: '/staff/home' });
                }else if(this.response === "2"){

                    // 经理
                    that.rank = 2;
                    that.$router.replace({ path: '/manager/home' });
                }else if(this.response === "3"){

                    // 老总
                    that.rank = 3;                    
                    that.$router.replace({ path: '/mister/home' });
                }else if(this.response === "4"){

                    // 密码错误
                    that.title = "密码错误！";
                }else if(this.response === "5"){

                    // 工号错误
                    that.title = "工号不存在！";
                }else{

                    that.title = "请填写正确的工号和密码！";
                }
            }
            xhr.send(postData);
        }
	}
}
</script>

<style lang="scss" scoped>
    section{
    	width:50%;
    	margin:0 auto;
    	padding:28px;
    	min-height:82vh;
        min-width: 600px;

    	h2{
    		font-weight:400;
    		text-align:center;
    		letter-spacing:1px;
    		font-size:28px;
    		padding:12px 0;
    	}

    	.login{
    		opacity:0.6;
    		transition:1s all ease;
            background-color:#7fdbff;

            p{
                line-height:200px;
                position:relative;
                width:148px;
                left:50%;
                margin-left:-48px;
                letter-spacing:12px;
                color:#fff;
                font-size:48px;
                outline: none;
            }

    		&:hover{
    			opacity:1;
                width: 46%;
                min-width: 460px;
    		}
    	}

        .login,.form{
            width:50%;
            height:200px;
            margin:60px auto 32px;
            border-radius:10px;
            min-width: 500px;
        }
 
        .form{
            padding:12px 18px 0px;
            box-shadow: 0 0 5px 5px #a7a7a7;
            min-height:430px;
            background-color:#fff;

            h2{
                color:#555;
                letter-spacing:16px;
            }

            input{
                height:42px;
                width:100%;
                border:1px solid #eee;
                box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.075) inset;
                color: #555;
                font-size: 14px;
                padding:0 16px;
                outline:none;
                margin:28px 0;
                background-color:#eee;
                border-radius:5px;
            }

            input[type=submit]{
                width:50%;
                margin:28px 25%;
                border-radius:30px;
                box-shadow:1px 2px 2px rgba(0, 0, 0, 0.075);
                cursor:pointer;
                font-size:18px;
                background-color:#00adb5;
                color:#fff;
                letter-spacing:1px;
                opacity:0.7;
                transition:1s all ease;

                &:hover{
                    opacity:1;
                    width:40%;
                    margin:28px 30%;
                }
            }
        }


    	a{
    		outline: none;
            cursor:pointer;
    	}
    }
</style>