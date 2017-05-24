<template>
  <section>
      <h3 class="section-h"><span>添加文章分类</span></h3>
      <section class="section">
        <form class="form" @submit.prevent="submit">
          <div>
            <div class="label">
              <label><span>文章分类：</span></label>
            </div>
            <div class="input">
              <input type="text" v-model="aClass">    
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
      aClass:"",
    }
  },
  methods:{
    submit:function(){
      api.addArticeClass(this.aClass).then(res => {
        var response = res.data;
        if(response == "1"){
          this.aClass = "";
        }
      },res => {
          console.log(res.data);
      });
    }
  }
}
</script>