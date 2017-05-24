<template>
  <section>
      <h3 class="section-h"><span>添加书籍分类</span></h3>
      <section class="section">
        <form class="form" @submit.prevent="submit">
           <div>
              <div class="label">
                <label><span>书籍分类：</span></label>
              </div>
              <div class="input">
                <input type="text" v-model="className">    
              </div>
           </div> 
           <button type="submit" class="blue-Btn">提交</button>
        </form>
      </section>
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