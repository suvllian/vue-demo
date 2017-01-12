<template>
  <div class="right">
    <section>
       <h3>图片列表</h3>
       <table>
         <thead>
           <tr>
             <th>序号</th>
             <th>分类</th>
             <th>添加时间</th>
             <th>图片名</th>
             <th>图片</th>
             <th>标题</th>
             <th>简介</th>
             <th>热度</th>
             <th>显示</th>
             <th>操作</th>
           </tr>
         </thead>

         <tbody>
           <tr v-for="(item,index) in data">
             <td>{{index + 1}}</td>
             <td>{{item.cName}}</td>
             <td>{{new Date(parseInt(item.iDate) * 1000).toLocaleString().slice(0,11)}}</td>
             <td>{{item.iImage}}</td>
             <td><img v-bind:src=" 'http://suvllian.com/V/images/travel/' + item.iImage + '.jpg' "></td>
             <td>{{item.iTopic}}</td>
             <td>{{item.iContent}}</td>
             <td>{{item.iLike}}</td>
             <td>{{parseInt(item.iShow)?"是":"否"}}</td>
             <td><span class="change" @click="change(item,index)">修改</span><span class="delete" @click="deleteItem(item,index)">删除</span></td>
           </tr>

           <tr v-if="isChange">
             <td>{{changeForm.index + 1}}</td>
             <td>{{changeForm.cName}}</td>
             <td>{{new Date(parseInt(changeForm.iDate) * 1000).toLocaleString().slice(0,11)}}</td> 
             <td><input type="text" v-model="changeForm.iImage"></td>
             <td><img v-bind:src=" 'http://suvllian.com/V/images/travel/' + changeForm.iImage + '.jpg' "></td>
             <td><input type="text" v-model="changeForm.iTopic"></td>
             <td><textarea v-model="changeForm.iContent"></textarea></td>
             <td>{{changeForm.iLike}}</td>
             <td>
                显示<input class="radio" type="radio" v-model="changeForm.iShow" value="1">
                隐藏<input class="radio" type="radio" v-model="changeForm.iShow" value="0">
             </td>
             <td><span class="submit" @click="submit()">确认</span></td>
           </tr>
         </tbody>

       </table>
    </section>
  </div>
</template>

<script>

export default{
  data(){
    return{
      title:"添加图片",
      data:[],
      apiPath:"http://127.0.0.1/admin/",
      isChange:false,
      changeForm:{

      }
    }
  },
  methods:{
    getData:function(){
      this.$http.post(
        this.apiPath,
        {do:"image",concrete:"allImage"}
      ).then(function (res) {
        var response = res.data;
        this.data = response;
        console.log(res.data);
      },function (res) {
          console.log(res.data);
      });
    },

    change:function(item,index){
      this.isChange = true;
      this.changeForm = item;
      this.changeForm.index = index;
    },

    deleteItem:function(item,index){
      if(confirm("确认删除？")){
        this.$http.post(
          this.apiPath,
          {do:"image",concrete:"deleteImage",iId:item.iId}
        ).then(function (res) {
          console.log(res.data);

          if(res.data=="1"){

            // 数据库删除成功，删除前端中的该项。
            this.data.splice(index,1);
          }
        },function (res) {
          console.log(res.data);
        });
      }else{

      }
    },

    submit:function(){
      this.$http.post(
        this.apiPath,
        {do:"image",concrete:"changeImage",content:this.changeForm}
      ).then(function (res) {
        console.log(res.data);
        if(res.data=="1"){
          this.isChange = false;
        }
      },function (res) {
        console.log(res.data);
      });
    },
  },

  created(){
    this.getData();
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
      border-radius:5px;
    }

    table{
      border-collapse: collapse;
      border-spacing: 0;
      width: 100%; 
      margin:16px auto;
      margin-bottom: 0;

      span{
        cursor: pointer;
        display: inline-block;
        padding:6px 8px;
      }

      .change{
        border:1px solid #00adb5;
        border-right:0;
        border-top-left-radius:5px;
        border-bottom-left-radius:5px;

        &:hover{
          background-color:#00adb5;
          color: #fff;
        }
      }

      .delete{
        border:1px solid red;
        border-top-right-radius:5px;
        border-bottom-right-radius:5px;

        &:hover{
          background-color:red;
          color: #fff;
        }
      }

      .submit{
        border:1px solid #00adb5;
        border-radius:5px;
        padding:6px 12px;

        &:hover{
          background-color:#00adb5;
          color: #fff;
        }
      }
       
      td{
        border-bottom: 2px solid #ddd;
        padding: 8px 23px;
        margin: 0;
        max-width: 400px;
        min-width: 40px;
        text-align: center;

        img{
          max-height:50px;
          max-width: 180px; 
        }
      }

      input{
        width: 62px;
        padding:6px 3px;
        border:1px solid #ccc;
        border-radius:5px;
      }

      input[type=radio]{
        width: 5px;
      }

      textarea{
        width: 100%;
        height: 32px;
        padding:6px 3px;
        border:1px solid #ccc;
        border-radius:5px;
      }

      th{
        border-bottom: 2px solid #ddd;
        vertical-align: bottom;
        line-height: 1.42857;
        text-align: center;
        padding: 6px;
        padding-top: 0;
        margin: 0;
      }
    }
</style>