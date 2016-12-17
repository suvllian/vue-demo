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
            apiPath:"http://192.168.1.106/api/",
        }
    },

    methods:{
      getPostData:function(data,url){
          return this.$http.post(
              this.apiPath + url,
              data
          )
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

  #app{
    transition: 1s all ease-out;
  }

  .slide{
    transform: translateX(-220px);
  }
  
  body{
    overflow-x: hidden !important;
  }
</style>