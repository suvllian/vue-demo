<template>
	<header>
		<div @click="showMenu" ref="menuButton">
			<p>菜单</p>	
		</div>
	</header>
</template>

<script>

export default{
	data(){
		return{
			isMenuHidden:true
		}
	},
	methods:{
		changeMenu(){
			let menu = document.querySelector(".nav");
			if (this.isMenuHidden){
				menu.style.transform = "translateX(0px)";
				this.isMenuHidden = false;
			} else{
				menu.style.transform = "translateX(-280px)";
				this.isMenuHidden = true;
			}
		},

		showMenu() {
			this.changeMenu();
			document.body.addEventListener("click", this.addListener);
		},


	    addListener(event){
			let e = window.event ? window.event : event;
		    let target = e.srcElement || e.target;

		    if (target.className == "nav") {
		        return;
		    } else {
		        while (target.className != "nav" && target != this.$refs.menuButton && target.nodeName.toLowerCase() != "html") {
		            target = target.parentNode;
		        }
		        if (target.nodeName.toLowerCase() == "html") {
		        	this.changeMenu();
		        	document.body.removeEventListener("click", this.addListener);
		        }
		    }
		}
	}
}
</script>

<style lang="scss" scoped>
    header{
    	height: 64px;
    	width: 100%;
    	background-color: rgb(92, 205, 222);
    	position:fixed;
    	top: 0;
    	left: 0;
    	z-index: 100;
    }

    div{
    	padding: 0 12px;
    	width: 100px;
    	cursor: pointer;
    }

    p{
    	line-height: 64px;
    	font-size: 18px;
    	color: #fff;
    }
</style>