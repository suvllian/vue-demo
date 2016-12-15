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
			{title:"所有部门",src:'/mister/home',isActive:true,isA:true},
			{title:"所有员工",src:'/mister/all',isActive:false},
      {title:"添加员工",src:'/mister/add',isActive:false},
			{title:"年终奖金",src:'/mister/reward',isActive:false},
      {title:"修改密码",src:'/mister/cpass',isActive:false}
		]
  	}
  }
}
</script>

