<template>
  <div class="hello">
    <h1>{{title}}</h1>
    <h2 v-html="author"></h2>

    <input type="text" v-model="newItem" v-on:keyup.enter="addNew">
    <ul>
      <li v-for="(item,index) in items" v-bind:class="{finished:item.isFinished}" v-on:click="toggleFinish(item)">
        {{ index + 1 }} -- {{item.label}}  
      </li>
    </ul>
    <p class="delBtn" v-on:click="deleteAll">全部删除</p>
  </div>
</template>

<script>
import Store from './../localstorage'

export default {
  name: 'hello',

  data () {
    return {
      title:"This is A Todo List",
      author:"<span>Suvllian</span>",
      newItem:' ',
      items:Store.fetch(),
      childWords:''
    }
  },

  watch: {
    //观察items的变化，自动触发更新
    items: {
      handler: function(items){
        //items变化触发保存到localstorage
        Store.save(items)
      },
      deep: true // 深层复制
    }
  },

  //方法放在methods
  methods: {
    toggleFinish: function(item) {
      item.isFinished = !item.isFinished
    }, 

    //将新的一项压入数组
    addNew() {
      this.items.push({
        label: this.newItem,
        isFinished: false
      })
      this.newItem = ''
      this.broadcast('onAddnew', this.items) //向子级广播
    },

    deleteItem:function(item){
      var changeItem = this.items;
      for(var obj in changeItem){
        if (changeItem[obj].label===item.label) {
          changeItem.splice(obj,1);
        }
      }
      Store.save(changeItem);
    },

    deleteAll:function(){
      this.items = [ ];
      Store.save(this.items);
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  box-sizing:border-box;
}

h1 {
  font-size: 3.2em;
  font-weight: 300;
  line-height: 1.3;
  margin: 0;
  text-shadow: 2px 2px 5px #333;
}

h2{
  font-weight: 300;
  text-shadow: 1px 1px 2px #333;
}

input[type=text]{
  width:100%;
  height: 36px;
  border-radius: 5px;
  border: 1px solid #aaa;
  box-shadow: 1px 1px 5px #333;
  padding: 0 16px;
}

input[type=radio]{
  float: right;
  margin-right: 16%;
}

ul {
  list-style-type: none;
  padding: 16px 0 0 36px;
  height: auto;
}

li{
  width: 100%;
  margin:10px;
  font-size: 23px;
  text-align: left;
}
.hello{
  color: #89867e;
  font-family: "Lato",Calibri,Arial,sans-serif;
  height: 100%;
  width: 66%;
  margin: 0 auto;
}

.finished{
  text-decoration: line-through;
}

.delBtn{
  text-align: right;
  font-size: 24px;
  color: #333;
  cursor: pointer;
  text-shadow: 1px 1px 6px #333;
}
</style>
