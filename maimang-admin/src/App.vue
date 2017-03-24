<template>
  <div id="app">
    <Nav></Nav>
    <router-view></router-view> 
  </div>
</template>

<script>
import Nav from './components/home/nav.vue';
import './assets/table.scss';
import './assets/btn.scss';
import './assets/common.scss';

export default {
  name: 'app',
  components: { Nav }
}
</script>