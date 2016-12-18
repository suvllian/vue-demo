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

  body{
    overflow-x: hidden !important;
  }
</style>