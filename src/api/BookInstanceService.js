import http from '@/utils/Request'

const BookInstanceService = {
  // 查找所有副本
  async doPageFindAll(params) {
    var res = await http({
      url: 'bookInstance_doPageFindAll',
      data: params
    });
    return res;
  },

  // 根据图书id查找所有副本
  async doPageByBookId(params) {
    var res = await http({
      url: 'bookInstance_doPageByBookId',
      data: params
    });
    return res;
  },

  // 根据id查询副本信息
  async doGetInfo(id) {
    var res = await http({
      url: 'bookInstance_doGetInfo',
      data: {id: id}
    });
    return res;
  },

  // 创建(修改)副本
  async doBookInstanceAU(params) {
    var res = await http({
      url: 'bookInstance_doBookInstanceAU',
      data:params
    });
    return res;
  },

  // 删除副本
  async doDelete(id) {
    var res = await http({
      url: 'bookInstance_doDelete',
      data:{id: id}
    });
    return res;
  },
}
export default BookInstanceService
