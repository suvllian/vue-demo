<template>
  <section>
      <h3>添加书籍分类</h3>
      <form @submit.prevent="submit">
         <div>
            <div class="label">
              <label><span>书籍分类：</span></label>
            </div>
            <div class="input">
              <input type="text" v-model="className">    
            </div>
         </div> 
         <button type="submit" class="submit">提交</button>
      </form>
  </section>
</template>

<script>
import api from '../../api'

export default{
  data(){
    return{
      className:'',
    }
  },
  methods:{
    submit:function(){
      api.addBookClass(this.className).then(res => {
        var response = res.data;
        if(response == "1"){
          this.className = '';
        }
      },res => {
          console.log(res.data);
      });
    },
  }
}
</script>