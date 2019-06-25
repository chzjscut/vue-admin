import http from '@/utils/Request'

const UserService = {
  // 登录
  async loginByUsername(params) {
    var res = await http({
      url: 'user_doLogin',
      data:params,
    });
    return res;
  },
  
  // 查询所有账号
  async doPageFindAll(params) {
    var res = await http({
      url: 'user_doPageFindAll',
      data:params
    });
    return res;
  },

  // 创建、修改账号
  async doUserAU(params) {
    var res = await http({
      url: 'user_doUserAU',
      data:params
    });
    return res;
  },

  // 登出
  async logout() {
    var res = await http({
      url: 'openuser_doLogOut.do'
    });
    return res;
  },

  //
  async getUserInfo(params) {
    var res = await http({
      url: 'hot_doSearchMyHots.do',
      data:params,
    });
    return res;
  },

  // 根据id查询账号信息
  async doGetInfo(id) {
    var res = await http({
      url: 'user_doGetInfo',
      data: {id: id}
    });
    return res;
  },

  // 删除账号
  async doDelete(id) {
    var res = await http({
      url: 'user_doDelete',
      data:{id: id}
    });
    return res;
  },
}
export default UserService
