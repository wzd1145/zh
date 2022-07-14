<template>
  <div class="LoginBigComitu">
    <h1 class="LoginBigTitle">智慧服务平台</h1>
    <el-form ref="form" :rules="rules" :model="Form" class="LoginFrom">
      <p class="LoginFromTitle">欢迎登录</p>
      <el-form-item prop="username">
        <el-input v-model="Form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="Form.password"
          type="password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="Form.code"
          placeholder="请输入验证码"
          class="LoginCodeInput"
        ></el-input>
        <img
          :src="codeImg.captchaImg"
          class="LoginCodeImg"
          @click="HandLoginReCode"
          alt=""
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="LoginLoding" @click="HandLogin"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { LoginCode, LoginAdd } from '../../api/login'
// import {} from '../../api/login'
export default {
  data() {
    return {
      Form: {
        username: 'duck',
        password: 'admin888',
        token: '',
        code: ''
      },
      codeImg: {
        captchaImg: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            min: 3,
            max: 15,
            message: '账号必须在 3 到 15 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 15,
            message: '密码必须在 3 到 15 个字符',
            trigger: 'blur'
          }
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.HandGetCode()
  },

  methods: {
    HandLogin() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const reponLogin = await LoginAdd(this.Form)
          if (reponLogin.code === 200) {
            this.$notify({
              title: '标题',
              message: '登陆成功',
              type: 'success'
            })
            localStorage.setItem('token', reponLogin.data)
            this.$router.push('/')
          } else {
            this.$message({
              message: reponLogin.msg,
              type: 'error'
            })
          }
          console.log(reponLogin)
        }
      })
    },
    HandLoginReCode() {
      this.codeImg.captchaImg = ''
      this.Form.token = ''
      this.HandGetCode()
    },
    async HandGetCode() {
      const reponsetCode = await LoginCode()
      this.codeImg.captchaImg = reponsetCode.data.captchaImg
      this.Form.token = reponsetCode.data.token
    }
  }
}
</script>
<style>
.el-form-item {
  margin-top: 40px;
}
.LoginFromTitle {
  color: white;
  font-size: 30px;
}
.LoginBigTitle {
  padding: 50px 0 0 0;
  font-size: 50px;
  /* margin-top: 30px; */
  color: white;
  text-align: center;
}
.LoginBigComitu {
  width: 100%;
  height: 100%;
  background: url('https://ts1.cn.mm.bing.net/th/id/R-C.dab436e6a9d23101d719c1f3dd1a76a4?rik=ecsSPgiqEPBeNQ&riu=http%3a%2f%2fwww.shijuepi.com%2fuploads%2fallimg%2f201115%2f1-2011151G454.jpg&ehk=61OG%2bh8posKeFHHqLOOPJLQh6brnOHElxrxY9xRbGY4%3d&risl=&pid=ImgRaw&r=0')
    no-repeat 0 0;
}
.LoginLoding {
  width: 100%;
}
.LoginCodeInput {
  width: 60%;
}
.LoginFrom {
  margin: 170px auto;
  width: 20%;
}
.LoginCodeImg {
  margin-left: 3%;
  width: 37%;
}
</style>
