<template>
  <div class="right">
    <h3 class="section-h"><span>文章列表</span></h3>
    <section class="section">  
       <table>
         <thead>
           <tr>
             <th>序号</th>
             <th>分类</th>
             <th>文章名</th>
             <th>添加时间</th>
             <th>背景图</th>    
             <th>简介</th>
             <th>内容</th>
             <th>阅读量</th>
             <th>显示</th>
             <th>操作</th>
           </tr>
         </thead>

         <tbody>
           <tr v-for="(item,index) in data">
             <td>{{index + 1 + (page-1)*8}}</td>
             <td>{{item.aClassName}}</td>
             <td>{{item.aTopic}}</td>
             <td>{{item.aDate}}</td>
             <td><img v-bind:src="item.aImage"></td>             
             <td><textarea :value="item.aIntro"></textarea></td>
             <td><textarea :value="item.aContent"></textarea></td>
             <td>{{item.aVisit}}</td>
             <td>{{parseInt(item.aShow)?"是":"否"}}</td>
            <td><span class="change" @click="change(item,index)">修改</span><span class="delete" @click="deleteItem(item,index)">删除</span></td>
           </tr>

           <tr v-if="isChange">
             <td>{{changeForm.index + 1 + (page-1)*8}}</td>
             <td>{{changeForm.aClassName}}</td>
             <td><input type="text" v-model="changeForm.aTopic"></td>
             <td>{{changeForm.aDate}}</td>  
             <td><input type="text" v-model="changeForm.aImage"></td>
             <td><textarea v-model="changeForm.aIntro"></textarea></td>
             <td><textarea v-model="changeForm.aContent"></textarea></td>
             <td>{{changeForm.aVisit}}</td>
             <td>
                显示<input class="radio" type="radio" v-model="changeForm.aShow" value="1">
                隐藏<input class="radio" type="radio" v-model="changeForm.aShow" value="0">
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
        <span @click="next(--page)" class="submit">上一页</span>
        <span @click="next(++page)" class="submit">下一页</span>
        <span @click="" class="submit">尾页</span>
      </div>
    </section>
  </div>
</template>

<script>
import api from '../../api'

export default{
  data(){
    return{
      data:[],
      isChange:false,
      page:1,
      changeForm:{

      }
    }
  },
  methods:{
    getData:function(){
      api.getAllArticle(this.page).then(res => {
        var response = res.data;
        if(response.length>0){
          this.data = response;
        }else{
          this.page = this.page - 1;
        }
      },res => {
          console.log(res.data);
      });
    },

    next:function(page){
      if(page > 0){
        this.page = page;
        this.getData();
      }
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
      api.changeArticle(this.changeForm).then(res => {
        if(res.data == "1"){
          this.isChange = false;
        }
      },res => {
        console.log(res.data);
      });
    },
  },

  created(){
    this.getData();
  }
}
</script>