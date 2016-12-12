<template>
  <div id="app">
    <h1>vue-router Demo {{msg}}</h1>
     
      <ul class="nav">
        <li><router-link to="/">index</router-link></li>
        <li><router-link to="/hello">about</router-link></li>
        <li><router-link to="/second">conterParents</router-link></li>
      </ul>
      <router-view class="view"></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello Vue!',
    }
  }
}
</script>

