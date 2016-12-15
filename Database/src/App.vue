<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
   
  },

  data(){
    return{
     url:"http://192.168.1.106/api/",
    }
  }
}
</script>

<style type="text/css">
  *{
    margin: 0;
    padding: 0;
    outline: none;
  }
  
  body{
    min-width: 900px;
  }
</style>