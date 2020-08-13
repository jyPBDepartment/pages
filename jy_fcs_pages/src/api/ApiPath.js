//正式服务器地址
// const URLHost = 'http://127.0.0.1:8080'
// //测试服务器地址
// const URLHost = 'http://127.0.0.1:8080'
//开发服务器地址
// const URLHost = 'http://60.205.246.126/jy_fcs'
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
  //关联权限修改
  updateAccountPower: URLHost + '/accountInfo/updatePower',
  //权限设置移除
  deleteAccountPower: URLHost + '/accountInfo/deletePower',
  //查找关联表id
  findId: URLHost + '/accountInfo/findId',
  //关键字管理
  keyWordSearch: URLHost + '/keyWord/findByName',
  //关键字添加
  addKeyWord: URLHost + '/keyWord/add',
  //关键字状态
  keyWordEnable: URLHost + '/keyWord/enable',
  //关键字删除
  deleteKeyWord: URLHost + '/keyWord/delete',
  //关键字修改
  findKeyWordId: URLHost + '/keyWord/findById',
  updateKeyWord: URLHost + '/keyWord/update',
  //评论管理
  commentSearch: URLHost + '/commentInfo/findByName',
  //评论删除
  commentDelete: URLHost + '/commentInfo/delete',
  //评论启用、禁用
  commentEnable: URLHost + '/commentInfo/enable',
  //回复管理
  replySearch: URLHost + '/replyInfo/findByName',
  //回复删除
  replyDelete: URLHost + '/replyInfo/delete',
  //评论启用、禁用
  replyEnable: URLHost + '/replyInfo/enable',

  //查询权限
  findCount: URLHost + '/powerInfo/findCount',

  //密码修改
  updatePassword: URLHost + '/accountInfo/updatePassword',
  //模块管理
  moduleInfoSearch: URLHost + '/moduleInfo/findByName',
  //模块添加
  addModule: URLHost + '/moduleInfo/add',
  //模块禁用
  moduleInfoEnable: URLHost + '/moduleInfo/enable',
  //模块删除
  deleteModuleInfo: URLHost + '/moduleInfo/delete',
  //模块修改
  moduleFindById: URLHost + '/moduleInfo/findById',
  updateModuleInfo: URLHost + '/moduleInfo/update',
  //关键词分类
  findClassKey: URLHost + '/classification/findClassKey',
  //圈子管理
  postInfoSearch: URLHost + '/postInfo/findByName',
  //圈子状态 
  postInfoEnable: URLHost + '/postInfo/enable',
  //圈子查看详情
  findPostInfoId: URLHost + '/postInfo/findById',
  //圈子审核通过
  passPostInfo: URLHost + '/postInfo/passPostInfo',
  //圈子审核驳回
  refusePostInfo: URLHost + '/postInfo/refusePostInfo',
  findAccountId: URLHost + '/accountInfo/findAccountId',

  //图片上传地址
  uploadImg: URLHost + '/upload/uploadImg',
  //echart图数据显示
  initEchart: URLHost + '/main/initEchart',
  //权限查询
  searchPowerInfo: URLHost + '/powerInfo/findByName',
  //权限删除
  deletePowerInfo: URLHost + '/powerInfo/delete',
  //权限添加
  savePowerInfo: URLHost + '/powerInfo/save',
  //权限修改前查询数据
  powerInfoFindById: URLHost + '/powerInfo/findById',
  //权限修改
  updatePowerInfo: URLHost + '/powerInfo/update',
  //权限启用禁用
  powerInfoEnable: URLHost + '/powerInfo/enable',
  //权限添加下拉列表显示
  findAllPower: URLHost + '/powerInfo/findSubPowerList',
  //权限修改下拉列表显示
  updatePower: URLHost + '/powerInfo/findSubPowerList',
  //分类状态禁用启用
  classiEnable: URLHost + '/classification/enable',
  //分类模糊查询
  searchClassification: URLHost + '/classification/findByName',
  //分类删除
  deleteClassification: URLHost + '/classification/delete',
  //分类下拉列表显示添加
  findAllClass: URLHost + '/classification/findSubClassiList',
  //分类添加
  saveClassification: URLHost + '/classification/save',
  //分类修改前查询
  classificationFindById: URLHost + '/classification/findById',
  //分类修改下拉列表查询
  updateClass: URLHost + '/classification/findSubClassiList',
  //分类修改
  updateClassification: URLHost + '/classification/update',
  //农服查询+列表
  searchAgricultural: URLHost + '/agricultural/findByName',
  //农服查看详情
  agriFindById: URLHost + '/agricultural/findById',
  //农服状态审核
  updateStatus: URLHost + '/agricultural/passPostInfo',
  updateRefuse: URLHost + '/agricultural/refusePostInfo',
  //看图识病查询
  searchCaseInfo: URLHost + '/caseInfo/findByName',
  //看图识病删除
  deleteCaseInfo: URLHost + '/caseInfo/delete',
  //看图识病添加
  findAllCaseInfo: URLHost + '/classification/findCaseList',
  findAllCase: URLHost + '/classification/findDipList',
  saveCaseInfo: URLHost + '/caseInfo/save',
  //看图识病状态
  caseInfoEnable: URLHost + '/caseInfo/enable',
  //看图识病修改下拉列表
  findAllUpdateCaseInfo: URLHost + '/classification/findCaseList',
  findAllUpdateCase: URLHost + '/classification/findDipList',
  //看图识病修改前查询
  caseInfoFindById: URLHost + '/caseInfo/findById',
  //看图识病修改
  updateCaseInfo: URLHost + '/caseInfo/update',
  //看图识病查看详情
  caseFindById: URLHost + '/caseInfo/findById',
  //菜单管理
  findMenuByName: URLHost + '/menu/findByName',
  //角色管理
  roleSearch: URLHost + '/role/findByName',
  //角色保存
  saveRole: URLHost + '/role/save',
  //角色删除
  deleteRole: URLHost + '/role/delete',
  //角色启用、禁用
  enableRole: URLHost + '/role/enable',
  //根据id查询角色
  findRoleById: URLHost + '/role/findById',
  //修改菜单排序
  changeMenuSort: URLHost + '/menu/changeSort',
  //菜单启用、禁用
  enableMenu: URLHost + '/menu/enable',
  //菜单删除
  deleteMenu: URLHost + '/menu/delete',
  //获取菜单树形图
  findMenuTreeByName: URLHost + '/menu/findTree',
  //菜单保存
  saveMenu: URLHost + '/menu/save',
  //根据主键菜单
  findMenuById: URLHost + '/menu/findById',
  //删除菜单
  deleteMenu: URLHost + '/menu/delete',
  //根据角色ID查询菜单挂载信息
  findRelaByRoleId: URLHost + '/menu/findRelaByRole',
  //保存角色授权
  saveRelaFromRole: URLHost + '/menu/saveRelation',
  //清空角色权限
  removeRoleAuth: URLHost + '/role/removeAuth',
  //获取看图识病关键词列表
  findCaseKeyword: URLHost + '/caseInfo/findCaseKey',
  //权限子菜单查询
  menuPowerInfo: URLHost + '/powerInfo/findListById',
  //分类子菜单查询
  menuClassification: URLHost + '/classification/findListById',
}
export default {
  url
}
