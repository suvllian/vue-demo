<template>
  <div class="login-page">
    <div class="login-top">
      <img src="./../../assets/logo.png" alt="" class="logo">
      <h2 class="login-title">准备好建立联系了吗？</h2>
      <p class="login-intro">
        <span class="login-span">-保持沟通</span>
        <span class="login-span">-亲自沟通</span>
        <span class="login-span">-系统化沟通</span>
      </p>
    </div>
    <div class="login-medium">
      <form class="login-form">
        <input type="text" name="username" placeholder="USERNAME" class="login-input" v-model="username">
        <input type="password" name="password" placeholder="PASSWORD" class="login-input" v-model="password">
          <img src="./../../assets/login_button.png" class="login-button" alt="" @click="this.login">
        </input>
      </form>
    </div>
    <div class="login-bottom">
      <img src="./../../assets/login_bottom.png" alt="" class="login-bottom-img">
      <p class="login-copyright">SUVLLIAN</p>
    </div>
  </div>
</template>

<script>
import api from '../../api'

export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      const params = {
        do: 'contact',
        concrete: 'login',
        username: this.username,
        password: this.password
      }
      api.postMethod('', params).then(res => {
        const { csrf_token, success } = res.data
        if (success) {
          document.cookie = `csrf_token=${csrf_token}`
          this.$router.push('list')
        }
      })
    }
  }
}
</script>