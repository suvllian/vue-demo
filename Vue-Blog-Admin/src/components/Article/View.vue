<template>
  <div class="right">
    <section>
       <h3>图书列表</h3>
       <table>
         <thead>
           <tr>
             <th>序号</th>
             <th>分类</th>
             <th>书名</th>
             <th>添加时间</th>
             <th>背景图</th>
             <th>书图</th>     
             <th>简介</th>
             <th>推荐</th>
             <th>显示</th>
             <th>操作</th>
           </tr>
         </thead>

         <tbody>
           <tr v-for="(item,index) in data">
             <td>{{index + 1 + (page-1)*8}}</td>
             <td>{{item.cClass}}</td>
             <td>{{item.iName}}</td>
             <td>{{new Date(parseInt(item.iDate) * 1000).toLocaleString().slice(0,11)}}</td>
             <td><img v-bind:src="item.iBgLink"></td>
             <td><img v-bind:src="item.iImage"></td>
             
             <td>{{item.iContent}}</td>
             <td>{{item.iLike}}</td>
             <td>{{parseInt(item.iShow)?"是":"否"}}</td>
            <td><span class="change" @click="change(item,index)">修改</span><span class="delete" @click="deleteItem(item,index)">删除</span></td>
           </tr>

           <tr v-if="isChange">
             <td>{{changeForm.index + 1 + (page-1)*8}}</td>
             <td>{{changeForm.cClass}}</td>
             <td><input type="text" v-model="changeForm.iName"></td>
             <td>{{new Date(parseInt(changeForm.iDate) * 1000).toLocaleString().slice(0,11)}}</td>  
             <td><input type="text" v-model="changeForm.iBgLink"></td>
             <td><input type="text" v-model="changeForm.iImage"></td>
             <td><textarea v-model="changeForm.iContent"></textarea></td>
             <td>{{changeForm.iLike}}</td>
             <td>
                显示<input class="radio" type="radio" v-model="changeForm.iShow" value="1">
                隐藏<input class="radio" type="radio" v-model="changeForm.iShow" value="0">
             </td>
             <td>
                <span class="submit" @click="submit()">确认</span>
                <span class="submit" @click="cancle()">取消</span>
              </td>
           </tr>
         </tbody>
       </table>
    </section>

    <section>
      <div class="item">
        <span @click="next(1)" class="submit">首页</span>
        <span @click="prev" class="submit">上一页</span>
        <span @click="next(page+1)" class="submit">下一页</span>
        <span @click="" class="submit">尾页</span>
      </div>
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
      page:1,
      changeForm:{

      }
    }
  },
  methods:{
    getData:function(){
      this.$http.post(
        this.apiPath,
        {do:"book",concrete:"allBook",page:this.page}
      ).then(function (res) {
        var response = res.data;
        if(response.length>0){
          this.data = response;
        }else{
          this.page = this.page - 1;
        }
        console.log(res.data);
      },function (res) {
          console.log(res.data);
      });
    },

    prev:function(){
      if(this.page>1){
        this.page = this.page - 1;
        this.getData();
      }
    },

    next:function(page){
      this.page = page;
      this.getData();
    },

    change:function(item,index){
      this.isChange = true;
      this.changeForm = item;
      this.changeForm.index = index;
    },

    cancle:function(){
      this.isChange = false;
    },

    deleteItem:function(item,index){
      if(confirm("确认删除？")){
        this.$http.post(
          this.apiPath,
          {do:"book",concrete:"deleteBook",iId:item.iId}
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
        {do:"book",concrete:"changeBook",content:this.changeForm}
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