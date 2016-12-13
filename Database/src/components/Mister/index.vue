<template>
  <div>
    <Navbar></Navbar>
    <router-view></router-view>
    <Foot></Foot>
  </div>
</template>

<script>
import Navbar from './Navbar'
import Foot from './../Foot'

export default {
  components: {
    Navbar,Foot
  }
}
</script>
