<template>
	<header>
		<div class="container">
			<div class="nav-header">
				<h1 id="logo"><router-link v-bind:to="logo.src">{{logo.title}}</router-link></h1>
				<nav>
					<ul>
						<li v-for="item in liItems">
							<router-link v-bind:to="item.src">{{item.title}}</router-link>
						</li >
					</ul>
				</nav>
			</div>
		</div>
	</header>
</template>

<script>

export default{
	data(){
		return{
			logo:{
				title:"Database",
				src:"/"
			},
			liItems:[
				{title:"员工登录",src:'/staff/home'},
				{title:"经理登录",src:'/manager/home'},
				{title:"Boss登录",src:'/mister/home'}
			]
		}
	},
	methods:{
	
	}
}
</script>

<style lang="scss" scoped>
	$height:6rem;

	header{
		height: $height;
		width: 100%;
		background: white none repeat scroll 0 0;
    	box-shadow: 0 0.25rem 0.25rem -0.25rem rgba(0, 0, 0, 0.22);
    	padding: 0;

		position: relative;
		top: 0;
		left: 0;

	}

	h1, h2, h3, h4, h5, h6 {
	    color: rgba(0, 0, 0, 0.7);
	    font-weight: 400;
	    margin: 0 0 1.875rem;
	}

	.container{
		width: 1170px;
		height: $height;
		padding:0px 15px;
		margin: 0 auto;
	}

	.nav-header{
	    float: left;
	    position: relative;
		height: $height;
	    width: 100%;
	}

	#logo {
	    float: left;
	    font-size: 22px;
	    font-weight: 700;
	    margin-bottom: 0;
	    margin-top: 1rem;
	    padding-top: 15px;
	    text-transform: uppercase;

	    a {
		    border: 2px solid #00adb5;
		    color: rgba(21, 31, 44, 0.8);
		    padding: 0 7px;
		    position: relative;

		    &:hover{
		    	color: rgba(0, 0,0 , 0.9);
		    }

		    &:focus{
		    	color: rgba(0, 0,0 , 0.9);
		    }
		}
	}

	input{
    	font-size: 22px;
    	letter-spacing: 1px;

    	margin-top: 1.6rem;
    	margin-left: 16px;
    	height: 2.4rem;
    	width: 180px;
    	border:0;
    	border-bottom:1px solid #aaa;
    	padding:0.06rem 0.54rem;
    }

    input[name=small]{
    	display: none;
    }

	nav{
	    display: block;
	    float: right;
	    position: relative;
	    z-index: 2;



	    ul{
		    color: #848484;
		    font-family: "Open Sans",Arial,serif;
		    height: $height;
		    font-weight: 300;
		    margin:0 1rem 0 0;

		    li{
				float: left;
				height: $height;
			    padding-top: 0.25rem;
				position: relative;
				list-style: none;
				transition: 1s all ease;

				a{
					display: block;
					height: 100%;
					position: relative;
				    color: rgba(0, 0, 0, 0.8);
				    font-size: 0.875rem;
				    font-weight: 400;
				    padding: 2.125rem 1.3rem !important;
				    text-decoration: none;
				    text-transform: uppercase;
					transition: 0.5s all ease;
				}

				&:hover{
					background-color: #00adb5;

					a{
						color: #fff;
					}
				}
			}
		}
	}

	// 响应式布局
	@media screen and (max-width:1170px){
		.container{
			width: 100%;
		}
	}

	@media screen and (max-width:800px){
		nav{
			width: 136px;
			margin-left: -24px;
			overflow: hidden;

			input{
				display: none;
			}
		}

		input[name=small]{
	    	width: 136px;
			margin-top: 1.3rem;
			display: inline-block;
			margin-left: 28px;
	    }
	}
</style>

<style>
	*{
		padding: 0;
		margin: 0;
		text-decoration: none;
        box-sizing: border-box;
	}	
	body{
		background: #f9f9f9 none repeat scroll 0 0;
		color: #89867e;
		font-size: 16px;
	    font-family: "Lato",Calibri,Arial,sans-serif;
	}
</style>