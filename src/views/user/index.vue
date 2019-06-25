<template>
  <div class="app-container" id="wrapper">
    <div class="module-title">用户管理</div>
    <div class="app__content">
      <el-row class="mb15">
        <el-col :span="20"><el-button type="primary" size="mini" @click="toUserAU">+创建用户</el-button></el-col>
        <!-- <el-col :span="4" class="text-right" style="display: flex">
          <el-input size="mini" placeholder="请输入账号" clearable>
          </el-input>
          <el-button size="mini" type="primary" style="margin-left: 20px">搜索</el-button>
        </el-col> -->
      </el-row>
      <div>
        <el-table class="mb15"
                  :empty-text="loadingText"
                  :data="users"
                  :header-row-style="tableHeaderClass"
                  style="width: 100%">
          <el-table-column
            align="center"
            label="账号"
            prop="account">
          </el-table-column>
          <el-table-column
            align="center"
            label="姓名"
            prop="name">
          </el-table-column>
          <el-table-column
            align="center"
            prop="createdAt"
            label="创建日期">
          </el-table-column>
          <el-table-column
            align="center"
            prop="level"
            label="账号级别"
            :filters="level"
            :filter-multiple="false"
            filter-placement="bottom-end"
            :filter-method="levelFilter">
            <template slot-scope="scope">

              {{ scope.row.level| getLevelName}}
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
                <p>确定删除此用户吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="doDelete(scope.row.id),scope.row.visible = false">确定</el-button>
                </div>
                <el-button type="text" slot="reference">删除</el-button>
              </el-popover>
              <el-button type="text" @click="toUserAU(scope.row.id)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="counts-wrap mb15" v-if="users.length>0">共{{totalCount}}条数据，每页显示{{pageSize}}条</div>
        <el-pagination class="text-right"
                       background
                       layout="prev, pager, next"
                       :page-size="pageSize"
                       :total="totalCount"
                       :current-page="currentPage"
                       @current-change="handleCurrentChange"
                       v-if="users.length>0">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import cacheCookies from '@/utils/auth'
  import TimeUtils from '@/utils/TimeUtil'
  import UserService from '@/api/UserService'

  export default {
    data() {
      return {
        users: [],
        loadingText:'正在加载,请稍后...',
        level:[
          {text:"普通用户", value:1},
          {text:"管理员", value:2},
          {text:"超级管理员", value:3}
        ],
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
    filters: {
      getLevelName(value){
        switch(value){
          case 1:
            return "普通用户";
          case 2:
            return "管理员";
          case 3:
            return "超级管理员";
        }
      }
    },
    methods: {
      async init(){
        this.users=[];
        if(this.queryString.length > 0) {
          this.loadingText ="正在搜索,请稍后...";
        }else{
          this.loadingText ="正在加载,请稍后...";
        }
        var res = await UserService.doPageFindAll({
          page:this.currentPage,
          count:this.pageSize
        });

        this.totalCount = res.total;
        if(res.status === 1){
          if(res.data.length > 0){
            res.data.forEach(function(item, index){
              item.createdAt = TimeUtils.formatTime(item.createdAt, 'Y-M-D');
            });
            this.users = res.data;
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
      toUserAU(id){
        if(typeof id === 'object' || typeof id === 'undefined'){ //新增
          this.$router.push("user_au");
        }else{ //修改
          this.$router.push("user_au?id=" + id);
        }
      },
      async doDelete(id){
        var res = await UserService.doDelete(id);
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
      levelFilter(value, row) {
        return row.level === value;
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
