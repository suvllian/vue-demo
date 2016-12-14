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
  			{title:"我的主页",src:'/manager/home',isA:true},
  			{title:"部门员工",src:'/manager/all'},
        {title:"添加员工",src:'/manager/add'},
  			{title:"修改密码",src:'/manager/cpass'}
  		]
  	}
  }
}
</script>

