<template>
  <div class="app-container" id="wrapper">
    <div class="module-title">体裁管理</div>
    <div class="app__content">
      <el-row class="mb15">
        <el-col :span="20"><el-button type="primary" size="mini" @click="toGenreAU">+添加体裁</el-button></el-col>
      </el-row>
      <div>
        <el-table class="mb15"
                  :empty-text="loadingText"
                  :data="genres"
                  :header-row-style="tableHeaderClass"
                  style="width: 100%">
          <el-table-column
            align="center"
            label="名称"
            prop="name">
          </el-table-column>
          <el-table-column
            align="center"
            label="相关图书"
            width="100">
            <template slot-scope="scope">
              <el-button type="text" @click="toBook(scope.row.id)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column
            align="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-popover
                ref="popover"
                placement="top"
                width="200"
                v-model="scope.row.visible">
                <p>确定删除此体裁吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="doDelete(scope.row.id),scope.row.visible = false">确定</el-button>
                </div>
                <el-button type="text" slot="reference">删除</el-button>
              </el-popover>
              <el-button type="text" @click="toGenreAU(scope.row.id)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="counts-wrap mb15" v-if="genres.length>0">共{{totalCount}}条数据，每页显示{{pageSize}}条</div>
        <el-pagination class="text-right"
                       background
                       layout="prev, pager, next"
                       :page-size="pageSize"
                       :total="totalCount"
                       :current-page="currentPage"
                       @current-change="handleCurrentChange"
                       v-if="genres.length>0">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import cacheCookies from '@/utils/auth'
  import TimeUtils from '@/utils/TimeUtil'
  import GenreService from '@/api/GenreService'

  export default {
    data() {
      return {
        genres: [],
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
        this.genres=[];
        if(this.queryString.length > 0) {
          this.loadingText ="正在搜索,请稍后...";
        }else{
          this.loadingText ="正在加载,请稍后...";
        }
        var res = await GenreService.doPageFindAll({
          page:this.currentPage,
          count:this.pageSize
        });

        this.totalCount = res.total;
        if(res.status === 1){
          if(res.data.length > 0){
            this.genres = res.data;
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
      toGenreAU(id){
        if(typeof id === 'object' || typeof id === 'undefined'){ //新增
          this.$router.push("genre_au");
        }else{ //修改
          this.$router.push("genre_au?id=" + id);
        }
      },
      async doDelete(id){
        var res = await GenreService.doDelete(id);
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
