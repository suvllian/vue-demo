<template>
  <div>
    <Navbar :li-items="liItems"></Navbar>
    <Main></Main>
    <Foot></Foot>
  </div>
</template>

<script>
import Navbar from './../Common/Navbar'
import Foot from './../Common/Foot'
import Main from './Main'

export default {
  components: {
    Navbar,Foot,Main
  },

  data(){
  	return{
  		liItems:[
  			{title:"关于我们",src:'/'}
  		]
  	}
  }
}
</script>
