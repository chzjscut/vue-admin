<template>
  <el-breadcrumb class="module-title" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if='item.meta.title'>
        <span v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{generateTitle(item.meta.title)}}</span>
        <router-link v-else :to="item.redirect||item.path">{{generateTitle(item.meta.title)}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers'
    ])
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      var that = this;
      //console.log(this.$route);
      const matched = this.$route.matched.filter(item => item.name)
      //console.log(this.permission_routers)
      var startPath = matched[0].path;
      var levelLists = [];
      //levelLists.push(matched[0]);

      for(var i = 0; i < this.permission_routers.length; i++) {
        if(this.permission_routers[i].path && this.$route.path.indexOf(this.permission_routers[i].path) >= 0) {
          //console.log(this.permission_routers[i]);
          this.permission_routers[i].children.forEach(function(item, index) {
            if(that.$route.path.indexOf(item.path) >= 0) {
              var tempItem = JSON.parse(JSON.stringify(item));
              levelLists.push(tempItem)
            }
          });
          break;
        }
      }
      //console.log(levelLists);
      levelLists.forEach(function(item, index) {
        item.path = startPath + '/' + item.path;
      })
      //let matched = this.$route.matched.filter(item => item.name)
      /*const first = matched[0]
      if (first && first.name !== 'dashboard') {
        matched = [{ path: '/dashboard', meta: { title: 'dashboard' }}].concat(matched)
      }*/
      //this.levelList = matched
      this.levelList = levelLists
    },
    generateTitle(title) {
      return this.$t('route.' + title)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .title.el-breadcrumb {
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
