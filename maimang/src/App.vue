 <template>
  <div id="app">
    <Header></Header>
    <Album></Album>
    <Hot></Hot>
    <Teacher></Teacher>
    <ClassSet></ClassSet>
    <Person></Person>
    <JoinTitle></JoinTitle>
    <Join></Join>
    <About></About> 
    <!-- <MaskBox></MaskBox> -->
  </div>
</template>

<script>
import Header from './components/header'
import Album from './components/album'
import Hot from './components/hotclass'
import Teacher from './components/teacher'
import About from './components/about'
import ClassSet from './components/class'
import Person from './components/person'
import Join from './components/join'
import JoinTitle from './components/jointitle'
import MaskBox from './components/mask'

export default {
  name: 'app',
  components: {
    Header, Album, Hot, Teacher, About, ClassSet, Person, Join, JoinTitle, MaskBox
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
