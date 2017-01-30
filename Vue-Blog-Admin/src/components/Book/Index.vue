<template>
  <div class="right">
    <section>
        <h3>添加书籍</h3>

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
                    {{option.cClass}}
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
import api from '../../api'

export default{
  components: {
      add
  },
  data(){
    return{
      formItem:[
        {title:"书名：",name:"name",isText:true},
        {title:"书籍图片链接：",name:"imageName",isText:true},
        {title:"背景图片链接：",name:"bgLink",isText:true},
        {title:"分类：",name:"class",isSelect:true},
        {title:"简介：",name:"content",isTextarea:true},     
      ],
      formValue:{
        name:"",
        imageName:"",
        bgLink:"",
        class:"",
        content:"",
      },
      options:[],
    }
  },
  methods:{
    submit:function(){
      api.addBook(this.formValue).then(res => {
        var response = res.data;
        if(response==="1"){
          this.clearForm();
        }
      },res => {
          console.log(res.data);
      });
    },

    clearForm:function(){
      this.formValue.name = "";
      this.formValue.imageName = "";
      this.formValue.class = "";
      this.formValue.content = "";
      this.formValue.bgLink = "";
    },

    getOptions:function(){
      api.getBookClass().then(res=>{
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