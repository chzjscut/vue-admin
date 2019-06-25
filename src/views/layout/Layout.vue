<template>
	<!-- <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
		<sidebar class="sidebar-container"></sidebar>
		<div class="main-container">
			<navbar></navbar>
			<app-main></app-main>
		</div>
	</div> -->
	<el-container :class="{hideSidebar:!sidebar.opened}">
		<el-header height="50px" class="header">
			<navbar></navbar>
		</el-header>
		<el-container>
		    <el-aside width="200px">
		    	<sidebar class="sidebar-container"></sidebar>
		    </el-aside>
		    <el-main>
		    	<app-main></app-main>
		    </el-main>
		</el-container>
	</el-container>
</template>

<script>
import { Navbar, Sidebar, AppMain } from 'views/layout/components'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	@import "src/styles/mixin.scss";
	.app-wrapper {
	  @include clearfix;
	  position: relative;
	  height: 100%;
	  width: 100%;
	}
	.header {
		padding: 0;
	}
</style>
