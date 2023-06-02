<template>
    <div class="login-container">
        <div class="login-box">
            <div class="login-logo">
                <a href="#">
                    <img src="../../../assets/logo.png" alt="logo">
                </a>
            </div>
            <div class="login-form">
                <h2>用户登录</h2>
                <el-form ref="form" :model="loginForm" :rules="rules" label-position="left" label-width="0">
                    <el-form-item prop="cardId">
                        <el-input v-model="loginForm.cardId" placeholder="请输入学号"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                  <el-form-item prop="captchaText">
                    <input v-model="loginForm.captchaText" placeholder="请输入验证码">
                    <img :src="captchaImageUrl" alt="Captcha" @click="getCaptchaImage" style="cursor: pointer;" />
                  </el-form-item>
<!--                    <el-form-item>-->
<!--                      <input type="text" name="captchaText" placeholder="输入验证码">-->
<!--                      <img src="/captcha" alt="Captcha">-->
<!--                    </el-form-item>-->
                    <el-form-item>
                        <el-button type="primary" @click="do_login" :loading="loading">登录</el-button>
                        <el-button type="primary" @click="$router.push('/register')" :loading="loading">注册用户</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import {login} from '@/yudingyi/api/login.js'
import {setToken} from '@/utils/token'
// import axios from "axios";
export default {
  mounted() {
    this.captchaImageUrl = 'http://localhost:20235/auth/captcha?' + Date.now();
  },
  data() {
        return {
          captchaImageUrl: '',
          loginForm: {
            cardId: '',
            password: '',
            captchaText: ''
          },
          rules: {
            cardId: [{ required: true, message: '请输入学号', trigger: 'blur' }],
            password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            captchaText: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
          },
          loading: false
        }
    },
    methods: {
      do_login() {
          this.$refs.form.validate(valid => {
              if (valid) {
                  this.loading = true
                  console.log(this.loginForm);
                  // 发起网络请求，登录，如果登录成功，跳转到主页面
                  login(this.loginForm.cardId,this.loginForm.password, this.loginForm.captchaText).then(res =>{
                    console.log(res.code)
                    console.log(res.msg)
                    console.log(res.data)
                    if(res.code !== 200){
                      // 登录失败，显示错误提示
                      this.$message.error(res.msg);
                      this.loading = false
                    }
                    else {
                      setToken("token", res.data);
                      this.$message.success('登录成功')
                      this.loading = false
                      this.$router.push({ path: '/' })
                    }
                  }).catch(() => {
                      // 登录失败，显示错误提示
                      this.$message.error('网络错误')
                      this.loading = false
                  })
              }
          })
      },
      getCaptchaImage() {
        this.captchaImageUrl = 'http://localhost:20235/auth/captcha?' + Date.now();
        // Generate a unique URL each time for the captcha image
        // return 'http://localhost:20235/captcha?' + Date.now();
      },
      // refreshCaptcha() {
      //   // Make a request to the backend API to refresh the captcha
      //   axios.get('http://localhost:20235/auth/captcha')
      //       .then(response => {
      //         // Update the captcha image URL and clear the captcha text
      //         console.log("返回: ", response);
      //         this.loginForm.captchaText = '';
      //         this.captchaImageUrl = this.getCaptchaImage();
      //       })
      //       .catch(error => {
      //         console.error(error);
      //         // Handle error
      //       });
      // },
    }
}
</script>

<style lang="scss">
.login-container {
    margin-top: 10vh;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-box {
    width: 400px;
    height: 400px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px #ccc;

    .login-logo {
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        height: 80%;
      }
    }

    .login-form {
      padding: 20px;

      h3 {
        font-size: 24px;
        margin-bottom: 20px;
        text-align: center;
      }
    }
  }
}
</style>
