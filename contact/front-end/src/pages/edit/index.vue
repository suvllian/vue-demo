<template>
  <div class="edit-page">
    <header class="header">
      <div class="header-nav" @click="this.submit">
        <img src="./../../assets/login_button.png" alt="返回" class="header-icon">
      </div>
    </header>
    <section class="banner">
      <div>
        <img src="./../../assets/login_bottom.png" alt="" class="banner-img">
      </div>
      <DetailHeader v-if="id" />
      <EditHeader v-else />
    </section>
    <section class="form-field">
      <el-form ref="formValue" :model="form" :rules="rules" label-width="65px" label-position="left">
        <el-form-item label-width="0px" prop="name">
          <el-input v-model="form.name" placeholder="收获一个好友" class="friend-name"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.describe_text"></el-input>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input v-model="form.corproation"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="E_mail">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="标签" class="tags" prop="tag">
          <el-radio-group v-model="form.tag">
            <el-radio label="1">A</el-radio>
            <el-radio label="2">B</el-radio>
            <el-radio label="3">C</el-radio>
            <el-radio label="4">T</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="推荐次数">
          <el-input v-model="form.advice_times"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" :rows="3" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
    </section>
    <el-dialog title="提示"
      :visible.sync="dialogVisible"
      width="90%">
      <span>确认放弃提交？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose(false)">取 消</el-button>
        <el-button type="primary" @click="handleClose(true)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import EditHeader from './components/edit.vue'
import DetailHeader from './components/detail.vue'
import api from '../../api'

export default {
  components: { EditHeader, DetailHeader },
  data () {
    return {
      dialogVisible: false,
      form: {
        name: '',
        phone: '',
        describe_text: '',
        corproation: '',
        address: '',
        email: '',
        tag: '1',
        advice_times: '',
        remark: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入电话', trigger: 'blur' },
        ],
        tag: [
          { required: true, message: '请至少选择一个标签' }
        ]
      },
      id: 0
    }
  },
  watch: {
    '$route':'getData'
  },
  methods: {
    handleClose (abandon) {
      this.dialogVisible = false
      if (abandon) {
        this.$router.push('list')
      }
    },
    getData () {
      const id = this.id
      if (!id) { return false }

      const params = {
        do: 'contact',
        concrete: 'getSpecial',
        id
      }

      api.getMethodByJson(params).then(res => {
        const { data = [], success = false } = res.data
        if (success) {
          this.form = { ...this.form, ...data}
        } else {
          this.$router.push('/')
        }
      })
    },
    submit () {
      const appendObject = this.id ? { id: this.id, concrete: 'edit' } : {}
      const params = {
        do: 'contact',
        concrete: 'add',
        ...this.form,
        ...appendObject
      }

      this.$refs['formValue'].validate(valid => {
        if (valid) {
          api.postMethod('', params).then(res => {
            const { success } = res.data
            if (success) {
              this.$router.push('list')
            }
          })
        } else {
          this.dialogVisible = true
          return false;
        }
      })
      
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getData()
  }
}
</script>