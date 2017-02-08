<template>
  <section>
      <h3>添加城市</h3>
      <form @submit.prevent="submit">
         <div>
            <div class="label">
              <label><span>城市名：</span></label>
            </div>
            <div class="input">
              <input type="text" v-model="city">    
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
      city:""
    }
  },
  methods:{
    submit:function(){
      api.addCity(this.city).then(function (res) {
        var response = res.data;
        if(response == "1"){
          this.city = "";
        }
      },function (res) {
          console.log(res.data);
      });
    }
  }
}
</script>