<template>
  <div class="right">
    <section>
        <h3>{{ infor }}</h3>

        <form @submit.prevent="submit">
           <div v-for="item in formItem">

              <div class="label">
                <label><span>{{item.title}}</span></label>
              </div>

              <div class="input" v-if="item.isText">
                <input type="text" v-model="formValue[item.name]">    
              </div>

              <div class="input" v-if="item.isFile">
                <input type="file" @change="selectImage" ref="file">  
              </div>
              <button @click.prevent="uploadImage" v-if="item.isFile">上传</button>

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

           <button type="submit" class="submit">提交</button>
        </form>

        <div class="view">
          <img src="#" alt="上传预览" ref="imageView">
        </div>
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
      infor:"添加图片",
      formItem:[
        {title:"名称：",name:"topic",isText:true},
        {title:"图片名：",name:"imageName",isText:true},
        {title:"图片：",name:"file",isFile:true},
        {title:"分类：",name:"city",isSelect:true},
        {title:"简介：",name:"content",isTextarea:true},     
      ],
      formValue:{
        topic:"",
        imageName:"",
        city:"",
        content:"",
      },
      options:[],
    }
  },
  methods:{
    submit:function(){
      api.addImage(this.formValue).then(res => {
        var response = res.data;
        if(response == "1"){
          this.infor = "添加成功";
        }
      },res => {
          this.infor = "添加失败";
          console.log(res.data);
      });
    },

    selectImage:function(){
      var image = this.$refs.file[0].files[0];
      var fileReader = new FileReader();
      fileReader.readAsDataURL(image);
      var $this = this;
      fileReader.onload = function(oFREvent){
        $this.$refs.imageView.src = oFREvent.target.result;
      };
    },

    uploadImage:function(){
      var file = this.$refs.file[0];
      var imageData = file.files[0];
      var fileReader = new FileReader();
      fileReader.readAsDataURL(imageData);
      
      var imagePath = file.value.split('\\');
      var imageName = imagePath[imagePath.length - 1];
      // 自动填充文件名
      this.formValue.imageName = imageName;
      var $this = this;

      fileReader.onload = function(e){
        api.uploadImage(e.target.result, imageName).then(res => {
          var response = res.data;
          if(response == "1"){
            $this.infor = "上传成功";
          }
        },res => {
            $this.infor = "上传失败";
            console.log(res.data);
        });
      }
    },

    getOptions:function(){
      api.getImageClass().then(res => {
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

<style lang="scss">
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
    position: relative;
  }

  form{
    display: inline-block;
    width: 55%;

    >div{
      margin:20px 0px;
    }

    input,textarea,option{
      border:1px solid #ddd;
      font-size: 14px;
      line-height: 20px;
      padding: 10px;
      border-radius:3px;
      width: 300px;
    }

    textarea{
      width: 360px;
    }

    button{
      padding:8px 16px;
      font-size: 18px;
      background-color: #00adb5;
      border:0px;
      color: #fff;
      letter-spacing: 2px;
      border-radius:6px;
    }

    $left:120px;
    .submit{
      margin-left: $left;
    }

    .label{
      width: $left;
      display: inline-block;
      text-align: right;
    }

    .input{
      display: inline-block;
    }
  }

  // 图片预览
  .view{
    display: inline-block;
    position:relative;
    
    img{
      max-height: 400px;
      max-width: 400px;
    }
  }
</style>