<template>
<div class="sidebar clearfix">
  <scroll-bar class="scroll-menu">
    <el-menu mode="vertical" unique-opened :default-active="$route.path.match(/\w+/)[0]" background-color="#2E3740" text-color="#fff" active-text-color="#333">
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
  <scroll-bar class="scroll-submenu">
    <el-menu mode="vertical" unique-opened :default-active="$route.meta.hidden?$route.path.split('/' + this.$route.name)[0]:$route.path" :collapse="isCollapse">
      <Submenu :routes="permission_routers"></Submenu>
    </el-menu>
  </scroll-bar>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import Submenu from './submenu'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, Submenu, ScrollBar },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data() {
    return {
      //active_path: ''
    }
  },
  /*watch: {
    $route(){
      console.log(this.$route.path.match(/\w+/)[0]);
    }
  },*/
  created() {
    //this.active_path = this.$route.path.match(/\w+/)[0];
  },
  methods: {
  }
}
</script>
<style rel="stylesheet/css" lang="css" scoped>
  .sidebar .scroll-menu {
    width: 90px;
    float: left;
    background-color: #2E3740;
  }
  .sidebar .scroll-submenu {
    width: 110px;
    float: left;
    background-color: #fff;
    border-right: 1px solid #E0E0E0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }
</style>