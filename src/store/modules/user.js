//import { loginByUsername, logout, getUserInfo } from '@/api/login'
import UserService from '@/api/login'
import cacheCookies from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: cacheCookies.getToken(),
    groupId: cacheCookies.getGroupId(),
    generalId: cacheCookies.getGeneralId(),
    name: cacheCookies.getName(),
    avatar: cacheCookies.getAvatar(),
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      console.log(token);
      state.token = token
    },
    SET_GROUPID: (state, groupId) => {
      state.groupId = groupId
    },
    SET_GENERALID: (state, generalId) => {
      state.generalId = generalId
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      var loginAccount = {
        account: username,
        password: userInfo.password
      };
      return new Promise((resolve, reject) => {
        UserService.loginByUsername(loginAccount).then(response => {
          if(response.status != 1) {
            var error = response.message;
            reject(error)
          } else {
            commit('SET_TOKEN', response.data.token)
            cacheCookies.setToken(response.data.token)
            commit('SET_GROUPID', response.data.companyId)
            cacheCookies.setGroupId(response.data.companyId)
            commit('SET_GENERALID', response.data.generalId)
            cacheCookies.setGeneralId(response.data.generalId)
            commit('SET_NAME', response.data.name)
            cacheCookies.setName(response.data.name)
            /*commit('SET_AVATAR', response.data.imageUrl.smallImg)
            cacheCookies.setAvatar(response.data.imageUrl.smallImg)*/
          }
          resolve()
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      var roleParams = {
        token: state.token,
        withPHot: 1,
        type: 1,
        updateTime: -1
      };
      return new Promise((resolve, reject) => {
        UserService.getUserInfo(roleParams).then(response => {
          if(response.status === -1001) {
            reject('error')
          } else {
            var roles = ['admin']
            commit('SET_ROLES', roles)
            commit('SET_INTRODUCTION', '我是超级管理员')
            resolve(response.data)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    SetRole({ commit }) {
      var roles = ['admin']
      commit('SET_ROLES', roles)
      commit('SET_INTRODUCTION', '我是超级管理员')
    },

    /*第三方验证登录
    LoginByThirdparty({ commit, state }, code) {
      return new Promise((resolve, reject) => {
        commit('SET_CODE', code)
        loginByThirdparty(state.status, state.email, state.code).then(response => {
          commit('SET_TOKEN', response.data.token)
          setToken(response.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },*/

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        console.log(state.token);
        UserService.logout(state.token).then(response => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          cacheCookies.removeToken()
          cacheCookies.removeGroupId()
          cacheCookies.removeGeneralId()
          cacheCookies.removeName()
          cacheCookies.removeAvatar()
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 动态修改权限
    ChangeRole({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        cacheCookies.setToken(role)
        UserService.getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.role)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
