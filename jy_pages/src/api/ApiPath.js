//正式服务器地址
// const URLHost = 'http://127.0.0.1:8080'
// //测试服务器地址
// const URLHost = 'http://127.0.0.1:8080'
//开发服务器地址
const URLHost = 'http://60.205.246.126/jy_system'
// const URLHost = 'http://localhost:8080'

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
  //导航搜索
  searchNavigation:URLHost + '/navigation/findByName',
  //导航状态禁用启用
  navigationEnable:URLHost+'/navigation/enable',
  //导航删除
  deleteNavigation:URLHost+'/navigation/delete',
  //导航添加
  saveNavigation:URLHost+'/navigation/save',
  //导航子菜单添加
  saveNavChildren:URLHost+'/navigation/save',
  //导航修改
  navigationFindById:URLHost+'/navigation/findById',  
  updateNavigation:URLHost+'/navigation/update',
  //导航子菜单修改
  navChildrenFindById:URLHost+'/navigation/findById',
  updateNavChildren:URLHost+'/navigation/update',
  //导航下拉列表添加显示
  findAllNavChildren:URLHost+'/navigation/findAll',
  //导航下拉列表修改显示
  findAllNc:URLHost+'/navigation/findSubNavList',
  //查询上级导航列表
  findSubNavList:URLHost+'/navigation/findSubNavList',
  //网站信息
  updateWebsiteInfoEntity: URLHost + '/websiteInfo/update',
  findWebsiteInfoFormnById: URLHost + '/websiteInfo/findById',
  //角色管理
  roleSearch: URLHost + '/role/findByName',
  addRole: URLHost + '/role/add',
  deleteRole: URLHost + '/role/delete',
  roleEnable: URLHost + '/role/enable',
  findRoleId: URLHost + '/role/findById',
  updateRole: URLHost + '/role/update',
  //权限管理
  limitSearch: URLHost + '/limit/findByName',
  limitEnable: URLHost + '/limit/enable',
  deleteLimit: URLHost + '/limit/delete',
  addLimit: URLHost + '/limit/add',
  findLimitById: URLHost + '/limit/findById',
  updateLimit: URLHost + '/limit/update',
  findLimit: URLHost + '/limit/findAll',
  //管理员添加
  saveAdmin:URLHost+'/admin/save',
  //管理员修改前查询
  adminFindById:URLHost+'/admin/findById',
  //管理员修改
  updateAdmin:URLHost+'/admin/update',
  //管理员查询
  searchAdmin:URLHost+'/admin/findByName',
  //管理员删除
  deleteAdmin:URLHost+'/admin/delete',
  //管理员连表查询（添加）
  findAllAdmin:URLHost+'/role/findAll',
  //管理员联表查询（修改）
  findAllUpdate:URLHost+'/role/findAll',
  //预约讲解
  appSearch:URLHost+'/appointment/findByName',
  addexplanstionEntity:URLHost+'/appointment/add',


  //菜单管理
  //新增菜单
  addMenu:URLHost+'/menu/add',
  //分页查询菜单
  findMenuByName:URLHost+'/menu/findByName',
  //分类信息查询
  searchClassification:URLHost+'/classification_info/findByName',
  //分类信息删除
  deleteClassification:URLHost+'/classification_info/delete',
  //分类信息禁用
  classiEnable:URLHost+'/classification_info/enable',
  //分类信息添加
  saveClassification:URLHost+'/classification_info/save',
  //分类信息修改
  classificationFindById:URLHost+'/classification_info/findById',
  updateClassification:URLHost+'/classification_info/update',
  //分类信息下拉查询(添加)
  findAllClass:URLHost+'/classification_info/findSubList',
  updateClass:URLHost+'/classification_info/findSubList',
  //分类信息添加前过滤重复字段

  // classiFindByWord:URLHost+'/w_classification_info/findByWord',
  //问卷信息分页及查询
  searchQuestion:URLHost+'/questionnaire/findByName',
  //问卷调查删除
  deleteQuestion:URLHost+'/questionnaire/delete',
  //问卷调查添加
  saveQuestion:URLHost+'/questionnaire/save',
  //问卷调查修改前查询
  questionFindById:URLHost+'/questionnaire/findById',
  //问卷调查修改
  updateQuestion:URLHost+'/questionnaire/update',

  // classiFindByWord:URLHost+'/w_classification_info/findByWord',

    //文章管理
  articleSearch:URLHost+'/article/findByName',
  addArticle:URLHost+'/article/add',
  deleteArticle:URLHost+'/article/delete',
  findArticleById:URLHost+'/article/findById',
  updateArticle:URLHost+'/article/update',
  articleEnable:URLHost+'/article/enable',
  isRelease:URLHost+'/article/release',
  isRecommend:URLHost+'/article/recommend',
  findClassification:URLHost+'/classification_info/findSubList',
  isTopping:URLHost+'/article/topping',

}
export default {
  url
}
