<template>
  <div>
    <Navbar></Navbar>
    <Main></Main>
    <Foot></Foot>
  </div>
</template>

<script>
import Navbar from './Navbar'
import Foot from './../Foot'
import Main from './Main'

export default {
  components: {
    Navbar,Foot,Main
  }
}
</script>
