import http from '@/utils/Request'

const BookService = {
  // 查找所有图书
  async doPageFindAll(params) {
    var res = await http({
      url: 'book_doPageFindAll',
      data:params
    });
    return res;
  },

  // 根据id查询图书信息
  async doGetInfo(id) {
    var res = await http({
      url: 'book_doGetInfo',
      data: {id: id}
    });
    return res;
  },

  // 书名关键字模糊查询
  async doFuzzyQueryByName(name) {
    var res = await http({
      url: 'book_doFuzzyQueryByName',
      data: {name: name}
    });
    return res;
  },

  // 新增/修改图书
  async doBookAU(params) {
    var res = await http({
      url: 'book_doBookAU',
      data:params
    });
    return res;
  },

  // 删除图书
  async doDelete(id) {
    var res = await http({
      url: 'book_doDelete',
      data:{id: id}
    });
    return res;
  },
}
export default BookService
