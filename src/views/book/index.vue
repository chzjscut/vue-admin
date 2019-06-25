<template>
  <div class="app-container" id="wrapper">
    <div class="module-title">图书管理</div>
    <div class="app__content">
      <el-row class="mb15">
        <el-col :span="20"><el-button type="primary" size="mini" @click="toBookAU">+添加图书</el-button></el-col>
      </el-row>
      <div>
        <el-table class="mb15"
                  :empty-text="loadingText"
                  :data="books"
                  :header-row-style="tableHeaderClass"
                  style="width: 100%">
          <el-table-column
            align="center"
            label="书名"
            prop="name">
          </el-table-column>
          <el-table-column
            align="center"
            label="作者"
            prop="author">
          </el-table-column>
          <el-table-column
            align="center"
            prop="isbn"
            label="图书编号">
          </el-table-column>
          <el-table-column
            align="center"
            label="体裁"
            min-width="150">
            <template slot-scope="scope">
              <el-tag
                style="margin: 5px 5px 0"
                type="primary"
                v-for="(genre, index) in scope.row.genres"
                :key="genre.id"
                disable-transitions>{{genre.name}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="副本操作"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" @click="toBookInstance(scope.row.id)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column
            align="right"
            label="操作"
            width="130">
            <template slot-scope="scope">
              <el-popover
                ref="popover"
                placement="top"
                width="200"
                v-model="scope.row.visible">
                <p>确定删除此副本吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="doDelete(scope.row.id),scope.row.visible = false">确定</el-button>
                </div>
                <el-button type="text" slot="reference">删除</el-button>
              </el-popover>
              <el-button type="text" @click="toBookAU(scope.row.id)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="counts-wrap mb15" v-if="books.length>0">共{{totalCount}}条数据，每页显示{{pageSize}}条</div>
        <el-pagination class="text-right"
                       background
                       layout="prev, pager, next"
                       :page-size="pageSize"
                       :total="totalCount"
                       :current-page="currentPage"
                       @current-change="handleCurrentChange"
                       v-if="books.length>0">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import cacheCookies from '@/utils/auth'
  import TimeUtils from '@/utils/TimeUtil'
  import BookService from '@/api/BookService'

  export default {
    data() {
      return {
        books: [],
        loadingText:'正在加载,请稍后...',
        currentPage:1, //当前选中的页数
        pageSize:10,//每页放多少条数据
        totalCount:0,//总的数据页数
        queryString:'',
        tableHeaderClass: {background: '#f0f0f0'}
      }
    },
    created() {
      this.init();
    },
    methods: {
      async init(){
        this.books=[];
        if(this.queryString.length > 0) {
          this.loadingText ="正在搜索,请稍后...";
        }else{
          this.loadingText ="正在加载,请稍后...";
        }
        var res = await BookService.doPageFindAll({
          page:this.currentPage,
          count:this.pageSize
        });

        this.totalCount = res.total;
        if(res.status === 1){
          if(res.data.length > 0){
            res.data.forEach(function(item, index){
              item.createdAt = TimeUtils.formatTime(item.createdAt, 'Y-M-D');
            });
            this.books = res.data;
          }else{
            this.loadingText ="暂无数据";
          }
        }else{
          this.$message({
            message: res.message,
            type: 'error'
          });
        }
      },
      toBookInstance(id){
        this.$router.push("../book_instance/index?id="+id);
      },
      toBookAU(id){
        if(typeof id === 'object' || typeof id === 'undefined'){ //新增
          this.$router.push("book_au");
        }else{ //修改
          this.$router.push("book_au?id=" + id);
        }
      },
      async doDelete(id){
        var res = await BookService.doDelete(id);
        if(res.status === 1){
          if(res.data === 1){
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.init();
          }else{
            this.$message({
              message: '删除失败',
              type: 'error'
            });
          }
        }else{
          this.$message({
            message: res.message,
            type: 'error'
          });
        }
      },
      couponStatusFilter(value, row) {
        return row.status === value;
      },
      handleCurrentChange(page) { //点击分页的组件
        this.currentPage = page;
        this.init();
      },
    }
  }
</script>

<style rel="stylesheet/css" lang="css" scoped>
  .operation{
    margin-left: 10px;
  }
  .operation .el-icon-edit{
    cursor: pointer;
    color: #999;
    font-size: 14px;
  }
  .operation .el-icon-edit:hover{
    color: #333;
  }
</style>
