<template>
  <div class="right">
    <h3 class="section-h"><span>添加文章</span></h3>
    <section class="section">
        <form class="form" @submit.prevent="submit">
           <div v-for="item in formItem">

              <div class="label">
                <label><span>{{item.title}}</span></label>
              </div>

              <div class="input" v-if="item.isText">
                <input type="text" v-model="formValue[item.name]">    
              </div>

              <div class="input" v-if="item.isSelect">
                <select v-model="formValue[item.name]">
                  <option v-for="option in options" :value="option.aId">
                    {{option.aClassName}}
                  </option>
                </select>    
              </div>

              <div class="input" v-if="item.isTextarea">
                <textarea v-model="formValue[item.name]" debounce="300"></textarea>  
              </div>
           </div> 

           <div class="article-list edit">
              <article class="article">
                <div class="article-content" v-html="formValue.content">

                </div>
              </article>
            </div>

           <button type="submit" class="blue-Btn">提交</button>
        </form>
    </section>

    <add></add>
  </div>
</template>

<script>
import add from './Add.vue'
import api from '../../api'

export default{
  components: { add },
  data(){
    return{
      formItem:[
        {title:"标题：",name:"name",isText:true},
        {title:"配图：",name:"image",isText:true},
        {title:"简介：",name:"intro",isText:true},
        {title:"日期：",name:"date",isText:true},
        {title:"分类：",name:"class",isSelect:true},
        {title:"内容：",name:"content",isTextarea:true},     
      ],
      formValue:{
        name:"",
        image:"",
        intro:"",
        class:"",
        content:"",
        date:"",
      },
      options:[]
    }
  },
  methods:{
    submit:function(){
      api.addArticle(this.formValue).then(res => {
        var response = res.data;
        if(response == "1"){
          alert("success");
        }
      },res => {
          console.log(res.data);
      });
    },

    getOptions:function(){
      api.getArticleClass().then(res => {
        this.options = res.data;   
      },res => {
          console.log(res.data);
      });
    }
  },

  created(){
    this.getOptions();
  }
}
</script>


<style lang="scss" scoped>
    .edit{
      position: absolute;
      right: 0;
      top: 0;
      width: 50%;
      height: 100%;
      background-color:#eee;

      h3{
        background-color:#fff;
      }
    }
</style>