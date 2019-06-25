import http from '@/utils/Request'

const GenreService = {
  // 查询所有体裁
  async doPageFindAll(params) {
    var res = await http({
      url: 'genre_doPageFindAll',
      data:params
    });
    return res;
  },

  // 根据id查询体裁信息
  async doGetInfo(id) {
    var res = await http({
      url: 'genre_doGetInfo',
      data: {id: id}
    });
    return res;
  },

  // 体裁名关键字模糊查询
  async doFuzzyQueryByName(name) {
    var res = await http({
      url: 'genre_doFuzzyQueryByName',
      data: {name: name}
    });
    return res;
  },

  // 新增/修改体裁
  async doGenreAU(params) {
    var res = await http({
      url: 'genre_doGenreAU',
      data:params
    });
    return res;
  },

  // 删除体裁
  async doDelete(id) {
    var res = await http({
      url: 'genre_doDelete',
      data:{id: id}
    });
    return res;
  },
}
export default GenreService
