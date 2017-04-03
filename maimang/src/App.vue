 <template>
  <div id="app">
    <Header></Header>
    <router-view></router-view> 
    <About></About> 
  </div>
</template>

<script>
import Header from './components/common/header'
import About from './components/common/about'

export default {
  name: 'app',
  components: {
    Header, About
  },
  data:{
    isShow:false
  }
}
</script>

<style lang="scss">
  @import './style/reset.scss';
  @import './style/header.scss';
  @import './style/album.scss';
  @import './style/hot.scss';
  @import './style/teacher.scss';
  @import './style/about.scss';
  @import './style/class.scss';
  @import './style/person.scss';
  @import './style/join.scss';
  @import './style/mask.scss';

  @import './style/common.scss';
</style>
