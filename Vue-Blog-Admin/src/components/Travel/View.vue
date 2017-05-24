<template>
  <div class="right">
    <h3 class="section-h"><span>图片列表</span></h3>
    <section class="section">  
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
             <th>发布状态</th>
             <th>操作</th>
           </tr>
         </thead>

         <tbody>
           <tr v-for="(item,index) in imageList">
             <td>{{index + 1}}</td>
             <td>{{item.cName}}</td>
             <td>{{new Date(parseInt(item.iDate) * 1000).toLocaleString().slice(0,11)}}</td>
             <td>{{item.iImage}}</td>
             <td><img v-bind:src=" 'http://suvllian.com/static/images/travel/' + item.iImage + '.jpg' "></td>
             <td>{{item.iTopic}}</td>
             <td>{{item.iContent}}</td>
             <td>{{item.iLike}}</td>
             <td>{{parseInt(item.iShow)?"发布":"未发布"}}</td>
             <td><span class="change" @click="change(item,index)">修改</span><span class="delete" @click="deleteItem(item,index)">删除</span></td>
           </tr>

           <tr v-if="isChange">
             <td>{{changeForm.index + 1}}</td>
             <td>{{changeForm.cName}}</td>
             <td>{{new Date(parseInt(changeForm.iDate) * 1000).toLocaleString().slice(0,11)}}</td> 
             <td><input type="text" v-model="changeForm.iImage"></td>
             <td><img v-bind:src=" 'http://suvllian.com/static/images/travel/' + changeForm.iImage + '.jpg' "></td>
             <td><input type="text" v-model="changeForm.iTopic"></td>
             <td><textarea v-model="changeForm.iContent"></textarea></td>
             <td>{{changeForm.iLike}}</td>
             <td>
                显示<input class="radio" type="radio" v-model="changeForm.iShow" value="1">
                隐藏<input class="radio" type="radio" v-model="changeForm.iShow" value="0">
             </td>
             <td><span class="submit" @click="submit()">确认</span><span class="submit" @click="isChange = false">取消</span></td>
           </tr>
         </tbody>

       </table>
    </section>

    <section>
      <div class="item">
        <span @click="next(1)" class="submit">首页</span>
        <span @click="next(page - 1)" class="submit">上一页</span>
        <span @click="next(page + 1)" class="submit">下一页</span>
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
      imageList:[],
      page:1,
      isChange:false,
      changeForm:{

      }
    }
  },
  methods:{
    getData:function(){
      var page = this.page;
      api.getAllImage(page).then(res => {
        var response = res.data;
        if(response.length > 0){
          this.imageList = response;
        }else{
          this.page = this.page - 1;
        }
      },res => {
          console.log(res.data);
      });
    },

    next:function(page){
      if(page >= 0){
        this.page = page;
        this.getData();
      }
    },

    change:function(item,index){
      this.isChange = true;
      this.changeForm = item;
      this.changeForm.index = index;
    },

    deleteItem:function(item,index){
      if(confirm("确认删除？")){
        api.deleteImage(item.id).then(res => {
          if(res.data == "1"){
            // 数据库删除成功，删除前端中的该项。
            this.imageList.splice(index,1);
          }
        },res => {
          console.log(res.data);
        });
      }
    },

    submit:function(){
      api.changeImage(this.changeForm).then(res =>{
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