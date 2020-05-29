//正式服务器地址
// const URLHost = 'http://127.0.0.1:8080'
// //测试服务器地址
// const URLHost = 'http://127.0.0.1:8080'
//开发服务器地址
// const URLHost = 'http://29.2.180.90:8080/rtl'
const URLHost = 'http://localhost:8080'

const dictCodeData = {
  mainPartCode: 'A0001' //主体码值
}
const url = {

  //登录
  login:URLHost + '/admin/login',

  //分页查询
  findAdminByName:URLHost + '/admin/findByName',
  //商品列表
  findAllCommodity: URLHost + '/commodity/findAll',
  //新增商品
  addCommodity: URLHost + '/commodity/add',
  //商品查询
   search: URLHost + '/commodity/findByName',
   //findById
   findCommodityById: URLHost + '/commodity/findById',
   //修改商品信息
   updateCommodity: URLHost + '/commodity/update',
   //删除商品信息
   deleteCommodity: URLHost + '/commodity/delete',
   //上架/下架
   openShelf: URLHost + '/commodity/opensulf',
   
  // //角色管理
  // //角色按编号、名称查询
  findAllRoles: URLHost + '/role/findAll',
  roleSearch: URLHost + '/role/findByName',
  addRoles: URLHost + '/role/add',
  //角色findById
  findRolesId: URLHost + '/role/findById',
  //修改角色信息
  updateRoles: URLHost + '/role/update',
  //删除角色
  deleteRoles: URLHost + '/role/delete',
  //角色启用/禁用
  rolesEnable: URLHost + '/role/enable',
  //权限查询
  jurisdictionSearch: URLHost + '/jurisdiction/findByName',
  findAllJurisdiction: URLHost + '/jurisdiction/findAll',
  //权限添加
  addJurisdiction: URLHost + '/jurisdiction/add',
  //权限删除
  deleteJurisdiction: URLHost + '/jurisdiction/delete',
  //权限启用禁用
  jurisdictionEnable: URLHost + '/jurisdiction/enable',
  //权限修改
  findJurisdictionById: URLHost + '/jurisdiction/findById',
  updateJurisdiction: URLHost + '/jurisdiction/update',

   //查询机构详情
   findAllOrgan:URLHost+'/organ/findAll',
   //添加机构
   saveOrgan:URLHost + '/organ/save',
   //修改机构
   organFindById:URLHost + '/organ/findById',
   updateOrgan:URLHost + '/organ/update',
   //模糊查询
   searchOrgan:URLHost +'/organ/findByName',
   //删除
   deleteOrgan:URLHost + '/organ/delete',
  //禁用
   organEnable:URLHost +'/organ/enable',
   //业务员详情查看
   findAllSales:URLHost +'/sales/findAll',

   //业务员添加
   saveSales:URLHost + '/sales/save',
   //业务员修改
   salesFindById : URLHost + '/sales/findById',
   updateSales : URLHost + '/sales/update',
   //业务员删除
   deleteSales :URLHost +'/sales/delete',
   //业务员模糊查询
   searchSales : URLHost + '/sales/findByName',

   
  //用户登录
  // login: URLHost + '/admin/login',
  // //用户注册
  // regedit: URLHost + '/admin/save',
  // //用户查询
  // search: URLHost + '/admin/findByName',
  // //加载所有用户列表
  // findAllAdmin: URLHost + '/admin/findAll',
  // //根据用户id查询用户信息

  // findAdminById: URLHost + '/admin/findById',
  // //修改用户信息
  // updateAdmin: URLHost + '/admin/update',
  // //删除用户信息
  // deleteAdmin: URLHost + '/admin/delete',
  // //统一管理 接口地址
  // //手工导入标签
  // //列表
  // //标签查询列表接口
  // // QueryTag: URLHost + '/tagInfo/findTagInfoList',

  // //获取全部主体接口  字典表
  // //新增
  // addMaunalTag: URLHost + '/importTag/save',
  // //获取主体  字典表获取 22个颗粒化的表、机构、性质 字典
  // //获取主、次、从 标签数据  字典表获取
  // //新增保存接口

  // //编辑
  // //获取主体  字典表获取 22个颗粒化的表
  // //获取主、次、从 标签数据  字典表获取
  // //获取标签基础信息 初始化用
  // updateImportTag: URLHost + '/importTag/updateImportTag',
  // //保存修改接口
  // importTagUpdate: URLHost + '/importTag/update',
  // //上传excel
  // //下载excel模板
  // //修改状态--三类标签修改状态可以用一个

  // //自定义标签
  // //列表
  // //手工运行
  // //新增
  // addUserDefinedTag: URLHost + '/userDefinedTag/save',
  // //获取主体  字典表获取 22个颗粒化的表、机构、性质、符号、条件、筛选条件类别
  // //获取主、次、从 标签数据  字典表获取
  // //获取 主体表、字段关系
  // //新增接口
  // //编辑
  // //获取标签信息
  // updateUserDefinedTag: URLHost + '/userDefinedTag/updateUserDefinedTag',
  // //获取主体  字典表获取 22个颗粒化的表、机构、性质、符号、条件、筛选条件类别
  // //获取主、次、从 标签数据  字典表获取
  // //获取 主体表、字段关系
  // //保存修改接口
  // userDefinedTagUpdate: URLHost + '/userDefinedTag/update',
  // //修改状态

  // //规则标签
  // //列表
  // findRuleTagInfo: URLHost + '/tagInfo/findTagInfoList',
  // //手工运行
  // maunalRun: URLHost + '/tagInfo/findTagInfoList',


  // //新增
  // saveRuleTag: URLHost + '/ruleTagManage/save',
  // //获取主体  字典表获取 22个颗粒化的表
  // //获取主体  字典表获取 22个颗粒化的表、机构、性质、符号、条件、筛选条件类别、出参参数类型、关联类型
  // //获取主、次、从 标签数据  字典表获取
  // //编辑
  // ruleTagUpdate: URLHost + '/ruleTagManage/updateRuleTag',
  // //获取主体  字典表获取 22个颗粒化的表、机构、性质、符号、条件、筛选条件类别、出参参数类型、关联类型
  // //获取主、次、从 标签数据  字典表获取
  // //获取模型、模型对应出参、入参、标签信息
  // updateRuleTag: URLHost + '/ruleTagManage/updateRuleTag',
  // //修改状态
  // updateRuleTagStatus: URLHost + '/tagInfo/updateRuleTagStatus',
  // //删除规则标签
  // deleteRuleTag: URLHost + '/tagInfo/deleteTagInfoByTagCode',
  // //标签查询
  // //标签列表，根据标签主体、名称、编号查询

  // //标签查询结果列表
  // QueryTag: URLHost + '/tagInfo/findTagInfoList',
  // //获取标签主体
  // getMainPartData: URLHost + '/dictInfo/findDictInfoList',
  // //查询结果列表
  // getTagBatchResult: URLHost + '/tagInfo/queryTagInfo',

  // //系统管理
  // //菜单管理
  // //菜单查询 不分页 查所有
  // getMenuPage: URLHost + '/menu/findpage',
  // getMenuAll: URLHost + '/menu/menulist',
  // //菜单新增
  // //菜单编辑
  // getMenuFindById: URLHost + '/menu/menuFindById',
  // saveMenu: URLHost + '/menu/saveMenu',

  // //菜单删除


  // //用户
  // //用户查询
  // //用户角色保存

  // //系统日志
  // //系统日志查询 分页 按 开始时间 结束时间

  // getTagList: URLHost + '/gettaglist',
  // getTagById: URLHost + '/getbyid'
}
export default {
  url,
  dictCodeData
}
