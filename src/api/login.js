import http from '@/utils/Request'

const LoginService = {
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
}
export default LoginService
