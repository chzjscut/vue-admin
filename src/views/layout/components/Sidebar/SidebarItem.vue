<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      
      <router-link v-if="!item.hidden&&item.children.length>0" :to="item.path+'/'+item.children[0].path" :key="item.name">
        <el-menu-item :index="item.name||item.path" class='submenu-title-noDropdown'>
          <!-- <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon> -->
          <span class="icon" :style="{backgroundImage: 'url('+require('@/assets/backend/menu_icons/'+(item.name==$route.path.match(/\w+/)[0]?item.meta.icon+'_active.png':item.meta.icon+'.png'))+')'}"></span>
          <span v-if="item.meta&&item.meta.title">{{generateTitle(item.meta.title)}}</span>
        </el-menu-item>
      </router-link>

    </template>
  </div>
</template>

<script>

export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  },
  data() {
    return {
      //subMenu: []
    }
  },
  methods: {
    generateTitle(title) {
      return this.$t('route.' + title)
    }
  }
}
</script>

<style rel="stylesheet/css" lang="css" scoped>
  .icon{
    width: 14px;
    height: 14px;
    margin-right: 5px;
    display: inline-block;
    background-size: cover;
  }
</style>