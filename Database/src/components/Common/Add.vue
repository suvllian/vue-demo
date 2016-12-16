<template>
	<section>
		<h2>{{title}}</h2>
		<form>
	        <div>
	            <span>姓名</span>
	            <input type="text" placeholder="请输入姓名" v-model="form.name">
	        </div>

	        <div>
	            <span>性别</span>
	             <select v-model="form.sex">
	                <option v-for="option in sex" :value="option.value">
	                	{{ option.text }}
	                </option>
	            </select>
	        </div>

	        <div>
	            <span>年龄</span>
	            <input type="text" placeholder="年龄" v-model="form.age">
	        </div>
	        
	        <div>
	            <span>电话</span>
	            <input type="text" placeholder="电话" v-model="form.tel">
	        </div>
	        
	        <div v-if="isMister">
	            <span>部门</span>
	            <select v-model="form.depart">
	                <option v-for="option in department" :value="option.value">
	                	{{ option.text }}
	                </option>
	            </select>
	        </div>

	        <div v-else>
	        	<span>部门</span>
	        	<input type="text" :value="department.text" disabled="true">
	        </div>
	       
	        <div>
	            <span>职位</span>
	            <select v-model="form.rank">
	                <option v-for="option in rank" :value="option.value">
	                	{{ option.text }}
	                </option>
	            </select>
	        </div>

	        <div>
	            <input @click.prevent="addPerson" type="submit" value="提交">
	        </div>
    	</form>
	</section>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		computed: mapState({ user: state => state.user }),

		data(){
			return{
				title:"添加员工",
				form:{
					name:"",
					sex: "" ,
					age: "",
					tel: "",
					depart:"",
					rank:""
				},
				sex:[
					{text:"男",value:"1"},
					{text:"女",value:"2"}
				],
				rank:[
					{text:"经理",value:"1"},
					{text:"副经理",value:"2"},
					{text:"组长",value:"3"},
					{text:"员工",value:"4"},
				],
				department:[
					{text:"财务部",value:"1"},
					{text:"人事部",value:"2"},
					{text:"销售部",value:"3"},
					{text:"后勤部",value:"4"},
				],
				isMister:true,
			}
		},

		methods:{
			addPerson:function(){
				if(!this.form.name||!this.form.sex||!this.form.age||!this.form.tel||!this.form.depart||!this.form.rank){ 
					console.log(this.form);
					this.title = "请输入完整信息！";
					return; 
				};
				var url = this.$root.url + "deal.php";
				var xhr = new XMLHttpRequest();
	            xhr.open('POST',url);
				var postData = "id=" + this.user.id + "&name=" + this.form.name + "&sex=" + this.form.sex +
								"&age=" + this.form.age + "&tel=" + this.form.tel + 
								"&depart=" + this.form.depart + "&rank=" + this.form.rank + "&type=add";
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
	            var that = this; 
	            xhr.onload = function(e){
	                if(this.response === "1"){
	                	that.title = "添加成功！";
	                	that.clearData();
	                }else{
	                    that.title = "添加失败，请重试！";
	                	that.clearData();
	                }
	            }
	            xhr.send(postData);
			},
			clearData:function(){
				this.form.name = "";
				this.form.sex = "";
				this.form.age = "";
				this.form.tel = "";
				this.form.depart = "";
				this.form.rank = "";
			},
			getDifferent:function(){
				var rank = parseInt(this.user.rank);
				var department = parseInt(this.user.department);

				if(rank===3||rank===4){
					this.$router.replace({ path: '/' });
				}else if(rank===2){
					this.rank.splice(0,2);
					this.form.depart = department;
					this.department = this.department[department-1];
					this.isMister = false;
				}
			}
		},

		created(){
			if(!this.user.id){
				this.$router.replace({ path: '/' });
			}

			this.getDifferent();
		}
	}
</script>

<style lang="scss" scoped>
    section{
    	width:50%;
    	margin:32px auto 16px;
    	padding:0px 0px 16px;
    	min-height:78vh;
    	box-shadow: 0 5px 5px #a7a7a7;

    	h2{
    		padding:16px 0px;
    		font-weight:400;
    		text-align:center;
    		font-size:28px;
    		background: #00adb5;
		    color: #fff;
		    border-top-left-radius: 10px;
		    border-top-right-radius: 10px;
    	}

    	form{
    		padding-top:48px;
    	}

    	div{
    		padding:8px 0px;
    		width:68%;
    		margin:0 auto;

    		span{
    			width:16%;
    			height:42px;
    			font-size:14px;
    			color:#555;
    			padding: 12px 36px;
    			display:inline-block;
    			background-color:#eee;
    			border-top-left-radius:4px;
    			border-bottom-left-radius:4px;
    		}

    		input[type=text],select{
    			height:42px;
    			width:84%;
    			margin-left:-1%;
    			border:1px solid #eee;
    			box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.075) inset;
			    color: #555;
			    font-size: 14px;
			    padding:0 16px;
			    outline:none;
    		}

    		option{
    			height:42px;
    			border:0px;
    			color: #555;
			    font-size: 14px;
			    padding:12px 16px;
			    outline:none;
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
				margin: 60px auto;
				width: 160px;
				text-align: center;
				
				transition: all .1s ease;

				&:active {
					box-shadow: 0px 3px 0px #aaa, 0px 3px 6px rgba(0,0,0,.9);
					position: relative;
					top: 6px;
				}
			}

    	}
    }
</style>