<template>
  <div class="list-page">
    <header class="header">
      <router-link :to="{path:'/edit'}">
        <div class="header-nav">
          <img src="./../../assets/add.png" alt="添加" class="header-icon">
        </div>
      </router-link>
      <div class="header-nav">
        <img src="./../../assets/list_search.png" alt="搜索" class="header-icon" @click="this.search">
      </div>
    </header>
    <section class="list-header">
      <h2 class="list-header-title">朋友圈</h2>
      <p class="list-header-p">关系放在第一位...</p>
    </section>
    <section class="list-container">
      <el-input v-model="infor" prefix-icon="el-icon-search" placeholder="现在联系谁？"></el-input>
      <div v-for="item in contactList"  :key="item.id">
        <router-link :to="{path:'/edit', query: {id: item.id}}">
          <div class="person">
            <p>{{item.name}}</p>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</mt-header>

  </div>
</template>

<script>
import api from '../../api'

export default {
  data () {
    return {
      pageIndex: 1,
      pageSize: 10,
      infor: '',
      contactList: []
    }
  },
  methods: {
    getList () {
      const params = {
        do: 'contact',
        concrete: 'getList',
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }

      api.getMethodByJson(params).then(res => {
        const { data = [], success = false } = res.data
        if (success) {
          this.contactList = data
        } 
        else {
          this.$router.push('/')
        }
      })
    },
    search () {
      const params = {
        do: 'contact',
        concrete: 'search',
        infor: this.infor
      }

      api.getMethodByJson(params).then(res => {
        const { data = [], success = false } = res.data
        if (success) {
          this.contactList = data
        } 
        else {
          this.$router.push('/')
        }
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>