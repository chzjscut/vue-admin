<template>
  <div class="app-container" id="wrapper">
    <Breadcrumb class="breadcrumb-container"></Breadcrumb>
    <div class="app__content">
      <p class="form-title">基本信息</p>
      <el-form :model="user" :rules="rules" ref="user" label-position="right" label-width="100px" class="form-content zj-trisect">
        <el-form-item prop="account" label="账号">
          <el-input placeholder="请输入要创建的账号名" v-model="user.account"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input placeholder="请输入密码" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item prop="execPassword" label="重复密码">
          <el-input placeholder="请再次输入密码" v-model="user.execPassword"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="用户姓名">
          <el-input placeholder="请输入用户姓名" v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item prop="level" label="角色">
          <el-radio-group v-model="user.level">
            <el-radio :label="1">普通用户</el-radio>
            <el-radio :label="2">管理员</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <el-button size="small">取消</el-button>
      <el-button size="small" type="primary" @click="doUserAU('user')" :loading="submitting" :disabled="disabled">保存</el-button>
    </div>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import ConfigUtil from '@/utils/ConfigUtil'
  import cacheCookies from '@/utils/auth'
  import TimeUtils from '@/utils/TimeUtil'
  import UserService from '@/api/UserService'

  export default {
    data() {
      return {
        id: this.$route.query.id || "",
        //店铺
        user: {
          account: '',
          password: '',
          execPassword: '',
          name: '',
          level: 1
        },
        rules: {
          account: [
            { required: true, message: '请输入要创建的账号名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          execPassword: [
            { required: true, message: '请再次输入密码', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入用户姓名', trigger: 'blur' }
          ],
          level: [
            { required: true, message: '请选择要创建的账号的级别', trigger: 'blur' }
          ],
          /*
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { pattern: /^[1][3,4,5,7,8][0-9]{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
          ],*/
        },
        disabled: false, //提交按钮禁用状态
        submitting: false, //提交按钮加载中状态
        loadingText:'正在加载,请稍后...',
        tableHeaderClass: {background: '#f0f0f0'}
      }
    },
    components: {
      Breadcrumb
    },
    created() {
      this.init();
    },
    methods: {
      async init() {
        if(this.id){ //修改
          var res = await UserService.doGetInfo(this.id);
          if(res.status === 1){
            res.data.execPassword = res.data.password;
            this.user = res.data;
          }else{
            this.disabled = true;
            this.$message({
              message: res.message,
              type: 'error'
            });
          }
        }
      },
      async doUserAU(formName){
        this.submitting = true;
        this.$refs[formName].validate(async (valid) => {
          if(valid){
            var auType = this.user.id ? "修改" : "添加",
                res = await UserService.doUserAU(this.user);
            if (res.status === 1){
              this.$message({
                message: auType+'成功!',
                type: 'success'
              });
              this.$router.back();
              this.submitting = false;
            }else {
              this.$message.error(auType+'失败!');
              this.submitting = false;
            }
          }else{
            this.$message({
              message: '表单填写有误',
              type: 'error'
            });
          }
        });
      },
    }
  }
</script>

<style scoped>
  /* .form-title {
    margin-left: -20px;
  } */
  .zj-trisect {

  }
  .zj-trisect .label {
    display: block;
    line-height: 1.5;
    color: #5a5e66;
  }
   .zj-trisect .el-input {
    max-width: 600px;
  } 
  .labels-wrap {
    display: inline-block;
    position: relative;
  }
  .labels-wrap .el-input {
    max-width: 100%;
  }
  .labels-wrap .tags {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0 12px;
  }


/* dialog */
.ui-retrieval{
    padding: 10px 0;
    overflow: hidden;
}
.ui-retrieval>li{
    float: left;
    padding-left: 7px;
    padding-right: 6px;
    padding-bottom: 10px;
    -webkit-box-sizing: border-box;
}
.retrieval-item{
    width:24px;
    height:24px;
    color: #666;
    font-size:14px;
    border: 1px solid #cccccc;
    border-radius: 50%;
    background-color: #fff;
    -webkit-box-sizing: border-box;
    display: -webkit-box;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    cursor: pointer;
}
.retrieval-item.selected{
    color: #fff;
    background-color:#CD2B3A;
}
.hot-icon{
    display: block;
    width:12px;
    height: 12px;
    /* background-image: url("../img/hot_1.png"); */
    background-repeat: no-repeat;
    -webkit-background-size: cover;
    background-size: cover;
}
.retrieval-item.selected .hot-icon{
    /* background-image: url("../img/hot_2.png"); */
}
.brand-list{
    margin: 0 -10px 0 2px;

}
.brand-list ul{
    overflow: hidden;
}
.brand-box{
    width: 25%;
    min-width: 110px;
    height: 65px;
    float: left;
    padding-right: 15px;
    padding-bottom:10px;
    box-sizing: border-box;
    background-color: #fff;
}
.brand-item{
    width:100%;
    height:100%;
    padding: 0 7px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid #ddd;
    box-sizing: border-box;
    cursor: pointer;
}
.brand-item.selected{
    border-color:#F56C6C;
}
.brand-icon{
    width: 40px;
    height: 40px;
    margin-right: 10px;
    background-size: cover;
}
.brand-info{
}
.brand-info h4{
    font-size: 14px;
    line-height: 1.5;
}
.brand-info p{
    font-size: 12px;
    color: #777;
}
</style>
