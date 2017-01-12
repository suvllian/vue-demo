<template>
  <div class="right">
    <section>
        <h3>{{title}}</h3>

        <form @submit.prevent="submit">
           <div v-for="item in formItem">

              <div class="label">
                <label><span>{{item.title}}</span></label>
              </div>

              <div class="input" v-if="item.isText">
                <input type="text" v-model="formValue[item.name]">    
              </div>

              <div class="input" v-if="item.isSelect">
                <select v-model="formValue[item.name]">
                  <option v-for="option in options" :value="option.cId">
                    {{option.cName}}
                  </option>
                </select>    
              </div>

              <div class="input" v-if="item.isTextarea">
                <textarea v-model="formValue[item.name]"></textarea>  
              </div>

           </div> 

           <button type="submit">提交</button>
        </form>
    </section>

    <add></add>
  </div>
</template>

<script>
import add from './Add.vue'

export default{
  components: {
      add
  },

  data(){
    return{
      title:"添加图片",
      formItem:[
        {title:"名称：",name:"topic",isText:true},
        {title:"图片名：",name:"imageName",isText:true},
        {title:"分类：",name:"city",isSelect:true},
        {title:"简介：",name:"content",isTextarea:true},     
      ],
      formValue:{
        topic:"",
        imageName:"",
        city:"",
        content:"",
        do:"image",
        concrete:"addImage"
      },
      options:[],
      apiPath:"http://127.0.0.1/bapi/"
    }
  },
  methods:{
    submit:function(){
      console.dir(this.formValue);
      this.$http.post(
        "http://127.0.0.1/admin/",
        this.formValue
      ).then(function (res) {
        var response = res.data;
        if(response=="1"){
          this.clearForm();
        }
        console.log(res.data);
      },function (res) {
          console.log(res.data);
      });
    },

    clearForm:function(){
      this.formValue.topic = "";
      this.formValue.imageName = "";
      this.formValue.city = "";
      this.formValue.content = "";
    },

    getOptions:function(){
      this.$http.post(
        "http://127.0.0.1/admin/",
        {do:"image",concrete:"getCity"}
      ).then(function (res) {
        var response = res.data;
        this.options = response;
      },function (res) {
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
    h3{
      font-weight: bold;
      padding:12px 16px;
      background-color: #eee;
      font-size: 16px;
      border-bottom: 1px solid #ddd;
    }

    section{
      border:2px solid #eee;
      margin:6px;
      padding-bottom:16px;
      border-radius:5px;
    }

    form{
      >div{
        margin:30px 0px;
      }

      input,textarea,option{
        border:1px solid #ddd;
        font-size: 14px;
        line-height: 20px;
        padding: 10px;
        border-radius:3px;
        width: 280px;
      }

      textarea{
        width: 500px;
      }

      button{
        padding:10px 20px;
        font-size: 18px;
        background-color: #00adb5;
        border:0px;
        color: #fff;
        letter-spacing: 2px;
        border-radius:6px;
        margin-left: 248px;
      }

      .label{
        width: 248px;
        display: inline-block;
        text-align: right;
      }

      .input{
        display: inline-block;
      }
    }
</style>