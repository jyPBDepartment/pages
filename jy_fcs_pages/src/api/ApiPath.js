//正式服务器地址
// const URLHost = 'http://127.0.0.1:8080'
// //测试服务器地址
// const URLHost = 'http://127.0.0.1:8080'
//开发服务器地址
// const URLHost = 'http://60.205.246.126/jy_system'
const URLHost = 'http://localhost:8080'

const url = {

  //登录
  login: URLHost + '/accountInfo/login',
  //账户管理
  accountInfoSearch: URLHost + '/accountInfo/findByName',
  //账户添加
  addAccountInfo: URLHost + '/accountInfo/add',
  //账户删除
  deleteAccountInfo: URLHost + '/accountInfo/delete',
  //账户状态
  accountInfoEnable: URLHost + '/accountInfo/enable',
  //账户修改
  findAccountInfoId: URLHost + '/accountInfo/findById',
  updateAccountInfo: URLHost + '/accountInfo/update',
  //密码修改
  updatePassword: URLHost + '/accountInfo/updatePassword',
  //模块管理
  moduleInfoSearch: URLHost + '/moduleInfo/findByName',
  //图片上传地址
  uploadImg: URLHost + '/upload/uploadImg'

}
export default {
  url
}
