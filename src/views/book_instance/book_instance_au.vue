<template>
  <div class="app-container" id="wrapper">
    <Breadcrumb class="breadcrumb-container"></Breadcrumb>
    <div class="app__content">
      <p class="form-title">基本信息</p>
      <el-form :model="bookInstance" :rules="rules" ref="bookInstance" label-position="right" label-width="100px" class="form-content zj-trisect">
        <el-form-item prop="imprint" label="图书名称">
          <el-select
            v-model="bookInstance.bookId"
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in books"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px;margin-left:10px">{{ item.author }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="imprint" label="出版社">
          <el-input placeholder="请输入出版社名称" v-model="bookInstance.imprint"></el-input>
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-radio-group v-model="bookInstance.status">
            <el-radio v-for="(item, index) in statusList" :key="item.value" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="归还日期">
          <el-date-picker
            v-model="bookInstance.due_back"
            type="date"
            placeholder="请选择归还日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <el-button size="small">取消</el-button>
      <el-button size="small" type="primary" @click="doBookInstanceAU('bookInstance')" :loading="submitting" :disabled="disabled">保存</el-button>
    </div>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import ConfigUtil from '@/utils/ConfigUtil'
  import cacheCookies from '@/utils/auth'
  import TimeUtils from '@/utils/TimeUtil'
  import BookService from '@/api/BookService'
  import BookInstanceService from '@/api/BookInstanceService'

  export default {
    data() {
      return {
        id: this.$route.query.id || "",
        bookId: this.$route.query.bookId || "",
        statusList: [
          {
            value: 'available',
            label: '空闲中'
          },
          {
            value: 'maintenance',
            label: '维护中'
          },
          {
            value: 'loaned',
            label: '已借出'
          }
        ],
        loading: false,
        books: [],
        bookInstance: {
          bookId: '',
          imprint: '',
          status: 'available',
          due_back: ''
        },
        rules: {
          imprint: [
            { required: true, message: '请输入出版社名称', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '请选择副本状态', trigger: 'blur' }
          ]
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
          var res = await BookInstanceService.doGetInfo(this.id);
          if(res.status === 1){
            this.bookInstance = res.data;
            this.books.push({
              id: res.data.bookId,
              name: res.data.name,
              author: res.data.author
            });
          }
        }else if(this.bookId){
          this.disabled = true;
          var response = await BookService.doGetInfo(this.bookId);
          if(response.status === 1){
            this.bookInstance.bookId = response.data.id;
            this.books.push({
              id: response.data.id,
              name: response.data.name,
              author: response.data.author
            });
          }
        }
      },
      async remoteMethod(query){
        var res = await BookService.doFuzzyQueryByName(query);
        if(res.status === 1){
          this.books = res.data;
        }
      },
      async doBookInstanceAU(formName){
        this.submitting = true;
        this.$refs[formName].validate(async (valid) => {
          if(valid){
            var auType = this.bookInstance.id ? "修改" : "添加",
                res = await BookInstanceService.doBookInstanceAU(this.bookInstance);
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
