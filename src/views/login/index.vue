<template>
  <div class="login-container clearfix">
    <div class="left-wrap">
      <img src="~@/assets/backend/login-bg.jpg">
    </div>
    <div class="right-wrap">
      <div class="login-box">
        <img class="logo" src="~@/assets/backend/login-logo.png">
        <h3 class="title">商户登录</h3>
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
          <el-form-item prop="username">
            <span class="input-icon-wrap user-icon"><i></i></span>
            <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="邮箱" />
          </el-form-item>
          <el-form-item prop="password">
            <span class="input-icon-wrap password-icon"><i></i></span>
            <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
              placeholder="密码" />
            <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
          </el-form-item>
          <el-form-item class="operations-wrap">
            <el-row>
              <el-col :span="12">
                <el-checkbox label="记住密码" v-model="loginForm.checked"></el-checkbox>
              </el-col>
              <el-col class="help" :span="12">
                <a>忘记密码？</a>
              </el-col>
            </el-row>
          </el-form-item>
          <el-button type="primary" style="width:100%;margin-top:10px;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
        </el-form>
      </div>

      <div class="download-wrap">
        <el-row class="download" :gutter="20">
          <el-col :span="6">
            <div class="download-title">客户端下载</div>
          </el-col>
          <el-col :span="6">
            <el-popover
              placement="top-end"
              width="300"
              trigger="click">
              <el-row>
                <el-col :span="16">
                  <h4>扫码下载</h4>
                  <p>超级助理手机客户端</p>
                </el-col>
                <el-col :span="8">
                  <img src="~@/assets/backend/qrcode_native.png" width=90>
                </el-col>
              </el-row>
              <el-button slot="reference">安卓版</el-button>
            </el-popover>
          </el-col>
          <el-col :span="6">
            <el-popover
              placement="top-end"
              width="300"
              trigger="click">
              <el-row>
                <el-col :span="16">
                  <h4>扫码下载</h4>
                  <p>超级助理手机客户端</p>
                </el-col>
                <el-col :span="8">
                  <img src="~@/assets/backend/qrcode_native.png" width=90>
                </el-col>
              </el-row>
              <el-button slot="reference">IOS版</el-button>
            </el-popover>
          </el-col>
          <el-col :span="6">
            <el-button @click="downloadPc">PC版</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
//import { isvalidUsername } from '@/utils/validate'
import socialSign from './socialsignin'
import { Message } from 'element-ui'
import cacheCookies from '@/utils/auth'

import http from '@/utils/Request'

export default {
  components: { socialSign },
  name: 'login',
  data() {
    /*const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }*/
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        checked: false
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      pwdType: 'password',
      loading: false,
      showDialog: false
    }
  },
  created() {
    /*async function test() {
      var res = await http({
        url: 'user_createUser',
        data:{account:'admin',password:'123456',level:3,name:'张三'},
      });
      console.log(res);
      return res.data;
    }
    test();*/

    if(cacheCookies.getRememberLogin() === 'true') {
      this.loginForm.username = cacheCookies.getAccount();
      this.loginForm.password = cacheCookies.getPassword();
      this.loginForm.checked = true;
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if(this.loginForm.checked) {
            cacheCookies.setAccount(this.loginForm.username);
            cacheCookies.setPassword(this.loginForm.password);
            cacheCookies.setRememberLogin(true);
          } else {
            cacheCookies.removeAccount();
            cacheCookies.removePassword();
            cacheCookies.setRememberLogin(false);
          }
          this.loading = true;
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
            // this.showDialog = true
          }).catch(error => {
            Message.error(error)
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    downloadPc() {
      window.location.href = "http://t.cn/RHVzJA4";
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    @include relative;
    height: 100%;
    min-width: 1200px;
    background-color: #fff;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 10px 5px 10px 5px;
      color: #888;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
    }
    .left-wrap {
      width: 56.25%;
      height: 100%;
      float: left;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .right-wrap {
      position: relative;
      float: right;
      width: 43.75%;
      height: 100%;
    }
    .login-box {
      position: absolute;
      left: 0;
      right: 0;
      width: 440px;
      padding: 35px 35px 15px 35px;
      margin: 60px auto;
      a {

      }
      .logo {
        display: block;
        width: 80px;
        height: 80px;
        margin: 0 auto;
      }
      .title {
        font-size: 30px;
        font-weight: 400;
        color: #333;
        margin: 20px auto 40px auto;
        text-align: center;
      }
    }
    .el-input {
      display: inline-block;
      height: 50px;
      width: 85%;
      vertical-align: middle;
    }
    .input-icon-wrap {
      display: inline-block;
      height: 50px;
      padding: 12px 5px 12px 15px;
      vertical-align: middle;
      box-sizing: border-box;
      i {
        display: inline-block;
        width: 24px;
        height: 24px;
        background-size: cover;
      }
    }
    .user-icon {
      i {
        background-image: url('~@/assets/backend/user.png');
      }
    }
    .password-icon {
      i {
        background-image: url('~@/assets/backend/password.png');
      }
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .el-form-item {
      border: 1px solid #CBCBCB;
      background: #fff;
      border-radius: 5px;
      color: #454545;
    }
    .operations-wrap {
      border: none;
      .el-form-item__content {
        line-height: 20px;
      }
    }
    .help {
      text-align: right;
      color: #01A1C5;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select:none;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
    .download-wrap {
      position: absolute;
      bottom: 40px;
      width: 100%;
    }
    .download {
      width: 420px;
      margin: 0 auto !important;
    }
    .download-title {
      line-height: 40px;
    }
    .box {
      height: 36px;
      line-height: 36px;
      min-width: 85px;
      text-align: center;
      border: 1px solid #CDCDCD;
      border-radius: 3px;
      cursor: pointer;
    }
    .el-popover {
      z-index: 2000;
    }
  }
</style>
