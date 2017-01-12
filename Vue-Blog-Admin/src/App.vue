<template>
    <div id="app">
        <Header></Header>
        <Navbar></Navbar>
        <router-view></router-view> 
    </div>
</template>

<script>
import Navbar from './components/Common/Navbar.vue';
import Header from './components/Common/Header.vue';

export default {
    name: 'app',
    components: {
      Navbar,Header
    }
}
</script>


<style type="text/css">
    *{
      padding:0;
      margin: 0;
      list-style: none;
    }

    .right{
      padding-left: 13.6%;
    }
</style>