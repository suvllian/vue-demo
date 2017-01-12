<template>
  <section>
      <h3>添加城市</h3>
      <form @submit.prevent="submit">
         <div v-for="item in formItem">
            <div class="label">
              <label><span>{{item.title}}</span></label>
            </div>
            <div class="input">
              <input type="text" v-model="formValue[item.name]">    
            </div>
         </div> 
         <button type="submit">提交</button>
      </form>
  </section>
</template>

<script>

export default{
  data(){
    return{
      formItem:[
        {title:"城市名：",name:"city"}  
      ],
      formValue:{
        city:"",
        do:"image",
        concrete:"addCity"
      },
      apiPath:"http://127.0.0.1/admin/"
    }
  },
  methods:{
    submit:function(){
      this.$http.post(
        this.apiPath,
        this.formValue
      ).then(function (res) {
        var response = res.data;
        if(response==="1"){
          this.clearForm();
        }
        console.log(res.data);
      },function (res) {
          console.log(res.data);
      });
    },

    clearForm:function(){
      this.formValue.city = "";
    },
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

      input{
        border:1px solid #ddd;
        font-size: 14px;
        line-height: 20px;
        padding: 10px;
        border-radius:3px;
        width: 280px;
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