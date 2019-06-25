import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading
Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    role: ['admin','editor']     will control the page role (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
**/
export const constantRouterMaps = [
  { path: '/login', component: _import('login/index'), hidden: true },
  {
    path: '',
    component: Layout,
    name: '',
    redirect: '/home',
    meta: {
      title: 'home',
      icon: 'home'
    },
    hidden: true
  },
  {
    path: '/home',
    component: Layout,
    name: 'home',
    redirect: '/home/index_admin',
    meta: {
      title: 'home',
      icon: 'home'
    },
    children: [{
      path: 'index_admin',
      component: _import('home/index_admin'),
      name: 'index_admin',
      meta: { title: 'index_admin', icon: 'index_admin' }
    }]
  },
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMaps
})

export const asyncRouterMaps = [
  {
    path: '/book',
    component: Layout,
    name: 'book',
    redirect: '/book/index',
    meta: {
      title: 'book',
      icon: 'home'
    },
    children: [{
      path: 'index',
      component: _import('book/index'),
      name: 'book_index',
      meta: { title: 'book_index', icon: 'home' }
    },{
      path: 'book_au',
      component: _import('book/book_au'),
      name: 'book_au',
      meta: { title: 'book_au', icon: 'home' }
    }]
  },
  {
    path: '/book_instance',
    component: Layout,
    name: 'book_instance',
    redirect: '/book_instance/index',
    meta: {
      title: 'book_instance',
      icon: 'home'
    },
    children: [{
      path: 'index',
      component: _import('book_instance/index'),
      name: 'book_instance_index',
      meta: { title: 'book_instance_index', icon: 'home' }
    },{
      path: 'book_instance_au',
      component: _import('book_instance/book_instance_au'),
      name: 'book_instance_au',
      meta: { title: 'book_instance_au', icon: 'home' }
    }]
  },
  {
    path: '/genre',
    component: Layout,
    name: 'genre',
    redirect: '/genre/index',
    meta: {
      title: 'genre',
      icon: 'home'
    },
    children: [{
      path: 'index',
      component: _import('genre/index'),
      name: 'genre_index',
      meta: { title: 'genre_index', icon: 'home' }
    },{
      path: 'genre_au',
      component: _import('genre/genre_au'),
      name: 'genre_au',
      meta: { title: 'genre_au', icon: 'home' }
    }]
  },
  {
    path: '/user',
    component: Layout,
    name: 'user',
    redirect: '/user/index',
    meta: {
      title: 'user',
      icon: 'home'
    },
    children: [{
      path: 'index',
      component: _import('user/index'),
      name: 'user_index',
      meta: { title: 'user_index', icon: 'home' }
    },{
      path: 'user_au',
      component: _import('user/user_au'),
      name: 'user_au',
      meta: { title: 'user_au', icon: 'home' }
    }]
  },
]
