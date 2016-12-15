<template>
  <div>
    <Navbar :li-items="liItems"></Navbar>
    <router-view></router-view>
    <Foot></Foot>
  </div>
</template>

<script>
import Navbar from './../Common/Navbar'
import Foot from './../Common/Foot'

export default {
  components: {
    Navbar,Foot
  },

  data(){
  	return{
  		liItems:[
  			{title:"我的主页",src:'/staff/home',isActive:true,isA:true},
  			{title:"修改信息",src:'/staff/change',isActive:false},
        {title:"修改密码",src:'/staff/cpass',isActive:false}
  		]
  	}
  }
}
</script>

