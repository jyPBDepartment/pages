//正式服务器地址
// const URLHost = 'http://127.0.0.1:8080'
// //测试服务器地址
// const URLHost = 'http://127.0.0.1:8080'
//开发服务器地址
// const URLHost = 'http://29.2.180.90:8080/rtl'
const URLHost = 'http://localhost:8080'

const url = {

  //登录
  login: URLHost + '/user/login',

  //Banner图管理
  //新增Banner图
  addBanner: URLHost + '/banner/save',
  //修改Banner图
  updateBanner: URLHost + '/banner/update',
  //删除Banner图
  deleteBanner: URLHost + '/banner/delete',
  //分页查询Banner图
  findBannerPageInfo: URLHost + '/banner/findPageInfo',
  //根据id获取Banner图信息
  findBannerInfoById: URLHost + '/banner/findInfoById',
  changeBannerStatus: URLHost + '/banner/changeStatus',

  //图片上传地址
  uploadImg: URLHost + '/upload/uploadImg',
}
export default {
  url
}
