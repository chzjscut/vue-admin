<template>
  <div class="app-container" id="wrapper">
    <div class="module-title">常用功能</div>
    <div class="app__content">
      <el-row>
        <el-col :span="3" class="item-box" v-for="router in common_routers" :key="router.id">
          <div class="item" @click="toHot(router.path)">
            <div class="item-icon el-icon-menu"></div>
            <p class="text-center">{{generateTitle(router.meta.title)}}</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import LoginService from '@/api/login'

  export default {
    computed: {
      ...mapGetters([
        'permission_routers'
      ])
    },
    data() {
      return {
        common_routers: [],
        loadingText:'正在加载,请稍后...',
      }
    },
    created() {
      this.init();
    },
    methods: {
      async init(){
        //console.log(this.permission_routers);
        for(let item of this.permission_routers){
          if(item.children && item.children.length > 0){
            for(let child of item.children){
              if(child.meta && child.meta.title !== 'index_admin' && !/_au/.test(child.meta.title)){
                var {...router} = child;
                router.path = item.path + '/' + router.path;
                this.common_routers.push(router);
              }
            }
          }
        }
      },
      toHot(path){
        this.$router.push('../../' + path);
      },
      generateTitle(title) {
        return this.$t('route.' + title)
      }
    }
  }
</script>

<style rel="stylesheet/css" lang="css" scoped>
  .item-box{
    min-width: 120px;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
  }
  .item{
    display: inline-block;
    cursor: pointer;
  }
  .item-icon{
    width: 60px;
    height: 60px;
    padding: 12px;
    margin: 0 auto;
    margin-bottom: 10px;
    opacity: .6;
    background: #4C9AFF;
    border-radius: 4px;
    background-size: 36px;
    background-repeat: no-repeat;
    background-position: center;

    color: rgba(255,255,255,.8);
    font-size: 36px;
  }
</style>
