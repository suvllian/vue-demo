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

import './assets/nav.scss';
import './assets/common.scss';
import './assets/article.scss';
import './assets/table.scss';
import './assets/btn.scss';

export default {
    name: 'app',
    components: { Navbar,Header }
}
</script>