<template>
  <div class="app-container" id="wrapper">
    <Breadcrumb class="breadcrumb-container"></Breadcrumb>
    <div class="app__content">
      <p class="form-title">基本信息</p>
      <el-form :model="book" :rules="rules" ref="book" label-position="right" label-width="100px" class="form-content zj-trisect">
        <el-form-item prop="name" label="图书名称">
          <el-input placeholder="请输入图书名称" v-model="book.name"></el-input>
        </el-form-item>
        <el-form-item prop="author" label="作者">
          <el-input placeholder="请输入作者" v-model="book.author"></el-input>
        </el-form-item>
        <el-form-item prop="genreIds" label="体裁">
          <el-select style="width: 100%;max-width:600px"
            v-model="book.genreIds"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in genres"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="isbn" label="图书编号">
          <el-input placeholder="请输入图书编号" v-model="book.isbn"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input placeholder="请输入简介" v-model="book.summary"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <el-button size="small">取消</el-button>
      <el-button size="small" type="primary" @click="doBookAU('book')" :loading="submitting" :disabled="disabled">保存</el-button>
    </div>
  </div>
</template>

<script>
  import Breadcrumb from '@/components/Breadcrumb'
  import ConfigUtil from '@/utils/ConfigUtil'
  import cacheCookies from '@/utils/auth'
  import TimeUtils from '@/utils/TimeUtil'
  import BookService from '@/api/BookService'
  import GenreService from '@/api/GenreService'

  export default {
    data() {
      return {
        id: this.$route.query.id || "",
        book: {
          name: '',
          author: '',
          genreIds: [],
          isbn: '',
          summary: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入图书名称', trigger: 'blur' }
          ],
          genreIds: [
            { required: true, message: '请选择体裁', trigger: 'blur' }
          ],
          author: [
            { required: true, message: '请输入作者', trigger: 'blur' }
          ],
          isbn: [
            { required: true, message: '请输入图书编号', trigger: 'blur' }
          ]
        },
        genres: [],
        loading: false,
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
          var res = await BookService.doGetInfo(this.id);
          if(res.status === 1){
            res.data.genreIds = res.data.genres.map(item => item.id);
            var {genres, ...book} = res.data;
            this.book = book;
            this.genres = genres;
          }else{
            this.disabled = true;
            this.$message({
              message: res.message,
              type: 'error'
            });
          }
        }
      },
      async remoteMethod(query){
        query = query.replace(/(^\s*)|(\s*$)/g, "");
        if(query){
          var res = await GenreService.doFuzzyQueryByName(query);
          if(res.status === 1){
            this.genres = res.data;
          }else{
            this.$message({
              message: res.message,
              type: 'error'
            });
          }
        }
      },
      async doBookAU(formName){
        this.submitting = true;
        this.$refs[formName].validate(async (valid) => {
          if(valid){
            var auType = this.book.id ? "修改" : "添加",
                res = await BookService.doBookAU(this.book);
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
