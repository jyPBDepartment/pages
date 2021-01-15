// 本地环境地址
const URLHost = 'http://localhost:8080';
const EDUHost = 'http://localhost:8083';
// 开发环境基础路径地址
// const URLHost = 'http://192.168.1.106:8080/jy_fcs';
// const EDUHost = 'http://192.168.1.106:8080/jy_edu';
// 生产环境基础路径地址
// const URLHost = 'http://hnser.jiyinongye.com:8080/jy_fcs';
// const EDUHost = 'http://hnser.jiyinongye.com/jy_edu';

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
  //绑定角色
  bindingRole: URLHost + '/accountInfo/bindingRole',
  //重置密码
  resetPass: URLHost + '/accountInfo/resetPass',
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

  //发布模块管理
  depolyMoudleSearch: URLHost + '/deployModuleInfo/findByName',
  //添加发布模块
  addDeployModule: URLHost + '/deployModuleInfo/save',
  //修改发布模块
  updateDeployModule: URLHost + '/deployModuleInfo/update',
  //findbyib
  depolyModuleFindId: URLHost + '/deployModuleInfo/findById',
  //发布模块删除
  deleteDepolyModule: URLHost + '/deployModuleInfo/delete',
  //启用
  deployModuleEnable: URLHost + '/deployModuleInfo/enable',

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
  //查询圈子类型
  getPostType: URLHost + '/postInfo/getPostType',
  //根据用户Id查询信息
  findAccountId: URLHost + '/accountInfo/findAccountId',
  //圈子删除
  deletePostinfo: URLHost + '/postInfo/delete',
  // 帖子设置精选
  postSetSelected: URLHost + '/postInfo/Boutique',

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
  // 看图识病设置精选
  caseSetSelected: URLHost + '/caseInfo/setSelect',
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
  //日志查询
  findLogList: URLHost + '/dbLogInfo/findByName',
  //日志删除
  deleteLogInfo: URLHost + '/dbLogInfo/delete',
  //日志清空
  deleteAllLog: URLHost + '/dbLogInfo/deleteAll',
  //获取导航栏菜单
  getNavMenuList: URLHost + '/menu/getNavData',
  //修改模块排序
  changeModuleSort: URLHost + '/moduleInfo/changeSort',
  //获取字典类型分页数据
  findDictType: URLHost + '/dict/findTypeByName',
  //保存字典类别
  saveDictType: URLHost + '/dict/addType',
  //保存字典键值
  saveDictData: URLHost + '/dict/addData',
  //启用禁用字典类型
  dictTypeEnable: URLHost + '/dict/enableType',
  //启用禁用字典键值
  dictDataEnable: URLHost + '/dict/enableData',
  //删除字典类别
  deleteDictType: URLHost + '/dict/deleteDictType',
  //删除字典键值
  deleteDictData: URLHost + '/dict/deleteDictData',
  //根据id获取字典类别信息
  findDictTypeById: URLHost + '/dict/findTypeById',
  //根据id获取字典键值信息
  findDictDataById: URLHost + '/dict/findDataById',
  //修改字典类别
  updateDictType: URLHost + '/dict/updateType',
  //修改字典键值
  updateDictData: URLHost + '/dict/updateData',
  //根据类别获取所有键值
  findDataByType: URLHost + '/dict/findDataByType',
  //根据类别清空所有键值
  removeDataByType: URLHost + '/dict/removeData',
  //根据字典类型获取对应所有生效键值
  getDictValue: URLHost + '/dict/getDictValue',
  //农服列表删除
  deleteAgricultural: URLHost + '/agricultural/delete',
  //查询粮价信息列表
  findGrainPricesList: URLHost + '/grainPrices/findPageByParam',
  //导入粮价
  grainPricesImport: URLHost + '/grainPrices/import',
  //获取地区数据
  grainPricesGetArea: URLHost + '/grainPrices/getArea',
  //保存粮价信息
  saveGrainPrices: URLHost + '/grainPrices/saveOrUpdate',
  //根据id查询粮价信息
  findGrainPricesInfoById: URLHost + '/grainPrices/findById',
  //根据id删除粮价信息
  deleteGrainPricesInfoById: URLHost + '/grainPrices/delete',
  //验证粮价日期是否重复
  checkPriceDate: URLHost + '/grainPrices/checkPriceDate',
  //查询粮价操作历史信息列表
  findGrainPricesHistoryList: URLHost + '/grainPricesHistory/findPageByParam',

  // 文章点评设置精选
  articleManageSetSelected: URLHost + '/articleManage/setSelected',

  //分页查询粮食买卖评论列表
  findCommentPageByParam: URLHost + '/grainTrading/findCommentPageByParam',
  // 粮食买卖评论生效
  grainTradingEnableComment: URLHost + '/grainTrading/enableComment',
  // 删除粮食买卖评论信息
  grainTradingDelCommentPC: URLHost + '/grainTrading/delCommentPC',
  // 粮食买卖设置精选
  grainTradingSetSelected: URLHost + '/grainTrading/setSelected',

  // 根据粮食买卖评论Id查询回复信息列表
  grainTradingFindReplyPageByParam: URLHost + '/grainTrading/findReplyPageByParam',
  // 删除粮食买卖回复信息
  grainTradingDelReplyPC: URLHost + '/grainTrading/delReplyPC',

  //分页查询文章点评评论列表
  exclusiveFindCommentPageByParam: URLHost + '/exclusive/findCommentPageByParam',
  // 文章点评评论生效
  exclusiveEnableComment: URLHost + '/exclusive/enableComment',
  // 文章点评回复生效
  exclusiveEnableReply: URLHost + '/exclusive/enableReply',

  // 删除文章点评评论信息
  exclusiveDelCommentPC: URLHost + '/exclusive/delCommentPC',
  // 删除文章点评回复信息
  exclusiveDelReplyPC: URLHost + '/exclusive/delReplyPC',
  // 根据文章点评评论Id查询回复信息列表
  exclusiveFindReplyPageByParam: URLHost + '/exclusive/findReplyPageByParam',
  // 分页查询看图识病评论列表
  caseInfoCommentFindCaseList: URLHost + '/caseInfoComment/findCaseList',
  // 删除看图识病评论信息
  caseInfoCommentDelete: URLHost + '/caseInfoComment/delete',
  // 查询看图识病回复信息
  caseInfoReplyFindReplyList: URLHost + '/caseInfoReply/findReplyList',
  // 删除看图识病回复信息
  caseInfoReplyDelete: URLHost + '/caseInfoReply/delete',

  //查询课程信息分页列表
  findLessonPage: EDUHost + '/lesson/findPage',
  //切换线下课程报名状态
  changeLessonEnroll: EDUHost + '/lesson/enrollSwitch',
  //切换线下课程生效状态
  changeLessonStatus: EDUHost + '/lesson/enableSwitch',
  //根据id获取线下课程信息
  findLessonById: EDUHost + '/lesson/findById',
  //根据id删除线下课程信息
  deleteLessonById: EDUHost + '/lesson/delete',
  //新增线下课程信息
  addLesson: EDUHost + '/lesson/add',
  //保存线下课程信息
  updateLesson: EDUHost + '/lesson/update',
  //获取所有职业类别信息
  findVocationOptions: EDUHost + '/option/findVocation',
  //根据课程id查询报名信息
  findStuListByLesson: EDUHost + '/lesson/findStuListByLesson',
  //设置管理
  //职业类别分页查询
  vocationInfoSearch: EDUHost + '/vocationInfo/findByName',
  //职业类别新增
  addEduVocationInfo: EDUHost + '/vocationInfo/add',
  //职业类别删除
  deleteVocationInfo: EDUHost + '/vocationInfo/delete',
  //通过id查询
  vocationInfoFindId: EDUHost + '/vocationInfo/findById',
  //职业类别修改
  updateEduVocationInfo: EDUHost + '/vocationInfo/update',
  //修改状态
  vocationInfoEnable: EDUHost + '/vocationInfo/enable',
  //修改排序
  changeVocationSort: EDUHost + '/vocationInfo/changeSort',

  //图片设置
  //分页查询
  pictureInfoSearch: EDUHost + '/pictureInfo/findByName',
  //添加
  addPictureInfo: EDUHost + '/pictureInfo/add',
  //通过id查询
  pictureFindById: EDUHost + '/pictureInfo/findById',
  //修改
  updatePictureInfo: EDUHost + '/pictureInfo/update',
  //删除
  deletePictureInfo: EDUHost + '/pictureInfo/delete',
  //修改状态
  pictureInfoEnable: EDUHost + '/pictureInfo/enable',
  //修改排序
  changePictureSort: EDUHost + '/pictureInfo/changeSort',

  //学习手册
  //标签管理
  //分页查询
  manualLabelInfoSearch: EDUHost + '/manualLabel/findByName',
  //添加
  addManualLabel: EDUHost + '/manualLabel/add',
  //修改
  updateManualLabel: EDUHost + '/manualLabel/update',
  //通过id查询
  manualLabelFindId: EDUHost + '/manualLabel/findById',
  //删除
  deleteManualLabel: EDUHost + '/manualLabel/delete',
  //修改状态
  manualLabelInfoEnable: EDUHost + '/manualLabel/enable',
  //手册列表
  //分页查询
  manualInfoSearch: EDUHost + '/manualInfo/findByName',
  // 添加
  addManualInfo: EDUHost + '/manualInfo/add',
  // 通过id查询
  manualFindById: EDUHost + '/manualInfo/findById',
  //修改
  updateManualInfo: EDUHost + '/manualInfo/update',
  //删除
  deleteManualInfo: EDUHost + '/manualInfo/delete',
  // 修改状态
  manualInfoEnable: EDUHost + '/manualInfo/enable',
  //职业类别下拉列表
  findVocationId: EDUHost + '/vocationInfo/occupation',
  // 标签下拉列表
  findLabelId: EDUHost + '/manualLabel/label',

  //试题管理
  // 分页查询
  questionInfoSearch: EDUHost + '/questionInfo/findByName',
  // 添加
  addQuestionInfo: EDUHost + '/questionInfo/add',
  //修改
  updateQuestionInfo: EDUHost + '/questionInfo/update',
  //删除
  deleteQuestionInfo: EDUHost + '/questionInfo/delete',
  //通过id查询
  questionFindById: EDUHost + '/questionInfo/findById',
  // 修改状态
  questionInfoEnable: EDUHost + '/questionInfo/enable',
  //获取有效并考试的职业类别
  findVocationIsExam: EDUHost + '/vocationInfo/findVocationIsExam',
  //获取职业类别关联试题
  findQuestVocationId: EDUHost + '/questionInfo/findQuestVocationId',
  //试卷管理
  //分页查询
  examPaperInfoSearch: EDUHost + '/examPaperInfo/findByName',
  //添加试题分页
  showQuestion: EDUHost + '/questionInfo/findQuestion',
  //添加
  addExamPaperInfo: EDUHost + '/examPaperInfo/add',
  //查询选项
  findByQuestionId: EDUHost + '/optionInfo/findByQuestionId',
  //修改状态
  examPaperInfoEnable: EDUHost + '/examPaperInfo/enable',

  //预览试卷
  preview: EDUHost + '/examPaperInfo/preview',
  //删除
  deleteExamPaperInfo: EDUHost + '/examPaperInfo/delete',
  //通过id查询
  ExamPaperFindById: EDUHost + '/examPaperInfo/findById',
  //修改
  updateExamPaperInfo: EDUHost + '/examPaperInfo/update',
  findByExamId: EDUHost + '/examPaperInfo/findByExamId',

  // 获取证书列表
  findCertificatePage: EDUHost + '/certificate/findPage',
  //根据主键删除证书
  deleteCertificateById: EDUHost + '/certificate/delete',
  //新增证书
  addCertificate: EDUHost + '/certificate/add',
  //修改证书状态
  changeCertificateStatus: EDUHost + '/certificate/enable',
  //根据id获取证书信息
  findCertificateById: EDUHost + '/certificate/findById',
  //修改证书信息
  updateCertificate: EDUHost + '/certificate/update',
  //查询证书模板
  findFormworkPage: EDUHost + '/formwork/findPage',
  //根据主键删除模板
  deleteFormworkById: EDUHost + '/formwork/delete',
  //新增模板
  addFormwork: EDUHost + '/formwork/add',
  //修改模板状态
  changeFormworkStatus: EDUHost + '/formwork/enable',
  //根据id获取实体
  findFormworkById: EDUHost + '/formwork/findById',
  //修改模板信息
  updateFormwork: EDUHost + '/formwork/update',
  //获取证书颁发列表
  findIssueList: EDUHost + '/issue/findPage',
  //获得证书统计列表
  findCertificateMgt: EDUHost + '/issue/findMgtPage',
  //切换职业类别是否需要考试
  vocationExamEnable: EDUHost + '/vocationInfo/examEnable',
  //板块管理
  //分页查询
  sectionSearch: URLHost + '/sectionManage/findByName',
  //修改状态
  sectionEnable: URLHost + '/sectionManage/enable',
  //删除
  deleteSection: URLHost + '/sectionManage/delete',
  //新增
  addSection: URLHost + '/sectionManage/add',
  //板块名称下拉列表
  findSection: URLHost + '/sectionManage/findListName',
  //通过id查询
  findSectionId: URLHost + '/sectionManage/findById',
  //编辑保存
  updateSectionManage: URLHost + '/sectionManage/update',
  //文章分页查询
  articleSearch: URLHost + '/articleManage/findByName',
  //查询有效版块
  findListSectionId: URLHost + '/sectionManage/findListSectionId',
  //新增
  addArticle: URLHost + '/articleManage/add',
  //删除
  deleteArticle: URLHost + '/articleManage/delete',
  //修改状态
  articleEnable: URLHost + '/articleManage/enable',
  //通过id查询
  ArticleFindById: URLHost + '/articleManage/findById',
  //编辑
  updateArticle: URLHost + '/articleManage/update',
}
export default {
  url
}
