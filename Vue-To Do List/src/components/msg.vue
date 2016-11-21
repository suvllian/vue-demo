<template>
  <div>
    <h3>{{ msg }}</h3>
    <h3>{{ msgfromfather }}</h3>
   <button v-on:click="onClickMe">Click</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 返回要渲染的数据
      msg: 'Hello from component a',
      childmsg: 'message from child'
    }
  },
  // props组件之间的通信，父级向子级传递信息
  // props: ['msgfromfather'],
  props: {
    msgfromfather: ''
  },
  events: {
    'onAddnew': function(items) {
      console.log(items)
    }
  },
  methods: {
    onClickMe() {
      console.log(this.msgfromfather)
      // 传递给父级，传参数
      //  Vue 实例实现了一个自定义事件接口，用于在组件树中通信。这个事件系统独立于原生 DOM 事件，用法也不同。
      // 每个 Vue 实例都是一个事件触发器：
      // 使用 $on() 监听事件；
      // 使用 $emit() 在它上面触发事件；
      // 使用 $dispatch() 派发事件，事件沿着父链冒泡；
      // 使用 $broadcast() 广播事件，事件向下传导给所有的后代。
      //this.$emit('child-msg', this.childmsg);
      this.$dispatch('child-msg', this.childmsg);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>