//配置后台接口
//开发环境基础路径地址
const URLHost = 'http://192.168.1.106:8080/jy_fcs';
// const URLHost = 'http://localhost:8080';

//生产环境基础路径地址
// const URLHost = 'http://182.92.77.60:8080/jy_fcs';

// im 服务地址
// 开发环境
// const imUrl = 'http://192.168.1.106:2001/webdemo/h5/index.html#/chat/';
// 生产环境
const imUrl = 'http://182.92.77.60:2001/webdemo/h5/index.html#/chat/';


let common = {
	userId: '',
	sesssionId: '',
	nc: ''
}

const md5 = {
	key: 'gCQsGhuXt9OWD0iTPyyraEOZbUdtGzit'
}

const extendUrl = {
	// 测试环境
	// findCustmerInfo: 'http://112.126.103.106:16302/jyhn-frontend/webHttpServlet'
	// 生产环境
	findCustmerInfo: 'http://hnser.jiyinongye.com/jw'
}
const url = {
	// 首页
	// 按照类型加载发布数据
	findDeployListByType: URLHost + '/agricultural/findStatusPass',
	// 发布
	// 根据不同类型发布信息
	deploy: URLHost + '/agricultural/save',

	// 图片上传地址
	uploadImg: URLHost + '/upload/uploadImg',

	//根据模块名称查询模块信息。
	findModuleListByName: URLHost + '/moduleInfo/findModuleListByName',

	//查询模块表所有非禁用信息。
	findModuleOn: URLHost + '/moduleInfo/findModuleOn',

	//查询所有农服信息的最新3条记录。
	findNewInfo: URLHost + '/agricultural/findNewInfo',

	//加载病虫害信息3条记录。
	findLatestCaseInfo: URLHost + '/caseInfo/findLatestCaseInfo',

	// 根据id获取病虫害信息
	findCaseInfoById: URLHost + '/caseInfo/findById',

	//根据农服标题名称查询农服列表信息
	findAgriInfo: URLHost + '/agricultural/findAgriInfo',

	//根据农服标题名称查询农服列表信息
	findAgriType: URLHost + '/agricultural/findAgriType',

	//加载病虫害分页信息
	findCasePage: URLHost + '/caseInfo/findCasePage',

	//查询分类 -- 加载农作物分类
	getCaseList: URLHost + '/classification/getCaseList',

	//查询分类 -- 信息加载病虫害检索编码
	getDipList: URLHost + '/classification/getDipList',

	//加载帖子类别滑块项
	addPostInfo: URLHost + '/postInfo/addPostInfo',

	//新增帖子
	getPostType: URLHost + '/postInfo/getPostType',

	//加载帖子列表
	findAllPostInfo: URLHost + '/postInfo/findAllPostInfo',

	//加载评论列表
	findByPostId: URLHost + '/commentInfo/findByPostId',

	//加载回复列表
	findByCommentId: URLHost + '/replyInfo/findByCommentId',

	

	//加载回复列表
	addReplyInfo: URLHost + '/replyInfo/addReplyInfo',

	// 根据帖子id查询帖子信息
	findPostInfoById: URLHost + '/postInfo/findById',

	//农服预约
	appointment: URLHost + '/farmwork/save',
	//加载我的农服发布列表
	agrSearch: URLHost + '/agricultural/findAgriInfo',
	//查询发布模块信息
	moduleShow: URLHost + '/deployModuleInfo/findAllDeployModuleInfo',
	//农服预约详情页面
	transKeyWordId: URLHost + '/agricultural/findId',
	//搜索我的农机发布
	findMyPublication: URLHost + '/agricultural/findMyPublication',
	//我的页面中农机，农服，粮食买卖详情页面
	findMineId: URLHost + '/agricultural/findMineId',
	//我的预约列表
	findMyFarm: URLHost + '/farmwork/findMyFarm',
	//意向客户筛选列表显示
	findFarmForMe: URLHost + '/farmwork/findFarmForMe',
	// 根据预约Id获取预约信息
	findFarmWorkById: URLHost + '/farmwork/findDetail',
	//取消预约
	cancel: URLHost + '/farmwork/cancel',
	//重新预约
	again: URLHost + '/farmwork/again',
	//我的预约已完成
	finish: URLHost + '/farmwork/finish',
	// 根据预约Id获取预约信息
	findFarmWorkById: URLHost + '/farmwork/findDetail',
	//意向用户待确认变确认
	userUpdateStatus: URLHost + '/farmwork/confirm',
	//我的页面农机取消发布
	cancelPub: URLHost + '/agricultural/unpublish',
	//农机修改
	updateMachine: URLHost + '/agricultural/update',
	//农机，农服，粮食买卖图片删除
	deleteMachine: URLHost + '/agricultural/deletePic',
	//根据筛选类型查询粮价信息
	findGrainPricesByType: URLHost + '/grainPrices/findListByType',
	//获取地区数据
	grainPricesGetArea: URLHost + '/grainPrices/getArea',
	//获取有效的3条文章列表
	findArticleInfo: URLHost + '/articleManage/findArticleInfo',
	//文章点评列表
	findArticleList: URLHost + '/articleManage/findListByChoose',
	//板块列表
	findSectionList: URLHost + '/sectionManage/findListSectionId',
	//文章详情
	findArticleIdDetails: URLHost + '/articleManage/findArticleId',
	// 文章点评收藏
	articleCollection: URLHost + '/exclusive/setCollection',
	// 文章点评点赞
	articlePraise: URLHost + '/exclusive/setPraise',
	// 文章点评浏览量
	articleAddPV: URLHost + '/exclusive/addPV',
	// 文章点评根据用户id查询评论信息
	articleFindCommentByUserId: URLHost + '/exclusive/findCommentByUserId',
	// 文章点评我的收藏
	articleFindMyCollection:URLHost+'/articleManage/findMyCollection',

	/**
	 * 慧农V_1.0 优化 接口
	 */
	// 设置粮食买卖信息收藏状态
	grainTradingSetCollection: URLHost + '/grainTrading/setCollection',
	// 增加粮食买卖信息阅读量
	grainTradingAddPV: URLHost + '/grainTrading/addPV',
	// 设置粮食买卖信息点赞 
	grainTradingSetPraise: URLHost + '/grainTrading/setPraise',
	// 增加粮食买卖信息评论
	grainTradingAddComment: URLHost + '/grainTrading/addComment',
	// grainTrading/addReply
	// 增加粮食买卖信息评论
	grainTradingAddReply: URLHost + '/grainTrading/addReply',
	
	// 删除粮食买卖下的回复
	grainTradingDeleteReply: URLHost + '/grainTrading/deleteReply',
	// 删除粮食买卖下的评论
	grainTradingDeleteComment: URLHost + '/grainTrading/deleteComment',
	// 查询粮食买卖详情
	grainTradingMobileView: URLHost + '/grainTrading/mobileView',
	// 查询粮食买卖下所有评论
	grainTradingFindCommentPage: URLHost + '/grainTrading/findCommentPage',
	// 查询粮食买卖下所有回复
	grainTradingFindReplyPage: URLHost + '/grainTrading/findReplyPage',
	// 条件查询粮食买卖列表
	agriculturalFindAgriInfo: URLHost + '/agricultural/findAgriInfo',
	// 根据用户id查询粮食买卖评论
	grainTradingGetMyComment: URLHost + '/grainTrading/getMyComment',
	// 根据用户id查询粮食买卖回复
	grainTradingGetMyReply: URLHost + '/grainTrading/getMyReply',
	// 设置帖子点赞功能
	postInfoPostThumbs: URLHost + '/postInfo/postThumbs',
	// 条件查询帖子列表
	postInfoFindByFive: URLHost + '/postInfo/findByFive',
	// 设置帖子收藏状态
	postInfoPostCollection: URLHost + '/postInfo/postCollection',
	// 我的收藏查询帖子列表
	postInfoPostByUserId: URLHost + '/postInfo/postByUserId',
	// 增加帖子浏览量
	postInfoFindById: URLHost + '/postInfo/findById',
	// 添加帖子发帖图片
	postInfoAddPostInfo: URLHost + '/postInfo/addPostInfo',
	// 根据帖子评论人ID查询评论
	postCommentInfoFindByUserId: URLHost + '/postCommentInfo/findByUserId',
	// 根据帖子回复人ID查询回复
	commentInfoFindByUserReplyId: URLHost + '/commentInfo/findByUserReplyId',
	// 根据帖子Id、用户id查询帖子列表详情
	postInfoFindPostId: URLHost + '/postInfo/findPostId',
	// 根据id查询评论列表信息
	postCommentInfoFindCommentByUserId: URLHost + '/postCommentInfo/findCommentByUserId',
	// 设置看图识病浏览量
	caseInfoFindNumById: URLHost + '/caseInfo/findNumById',
	// 新增看图识病评论
	caseInfoCommentSave: URLHost + '/caseInfoComment/save',
	// 设置看图识病点赞
	caseInfoSaveCasePraise: URLHost + '/caseInfo/saveCasePraise',
	// 新增看图识病回复
	caseInfoReplySave: URLHost + '/caseInfoReply/save',
	// 删除看图识病回复
	caseInfoReplyDelete: URLHost + '/caseInfoReply/delete',
	// 删除看图识病评论及评论下的回复
	caseInfoCommentDelete: URLHost + '/caseInfoComment/delete',
	// 设置看图识病与我无关
	caseInfoIsIrrelevant: URLHost + '/caseInfo/isIrrelevant',
	// 看图识病列表查询
	caseInfoFindCaseInfoList: URLHost + '/caseInfo/findCaseInfoList',
	// 设置看图识病收藏
	caseInfoSaveCollection: URLHost + '/caseInfo/saveCollection',
	// 我的看图识病收藏
	caseInfoFindByMyCollection: URLHost + '/caseInfo/findByMyCollection',
	// 根据评论人id查询评论
	caseInfoCommentFindByUserId: URLHost + '/caseInfoComment/findByUserId',
	// 根据回复人id查询回复
	caseInfoReplyFindByUserId: URLHost + '/caseInfoReply/findByUserId',
	// 看图士兵根据id userId查询
	caseInfoFindUserCaseId: URLHost + '/caseInfo/findUserCaseId',
	// 根据看图识病id、用户id查询评论信息
	caseInfoCommentFindCommentByUserId: URLHost + '/caseInfoComment/findCommentByUserId',
	// 看图识病查看详情
	caseInfoFindChannelId: URLHost + '/caseInfo/findChannelId',
	// 查询看图识病单条下所有评论
	caseInfoFindCommentPage: URLHost + '/caseInfo/findCommentPage',
	// 查询看图识病评论下全部回复
	caseInfoFindReplyPage: URLHost + '/caseInfo/findReplyPage',
	
	// 查询帖子列表
	postInfoFindPostInfoList: URLHost + '/postInfo/findPostInfoList',
	// 查询帖子单条下所有评论
	postInfoFindByCommentPage: URLHost + '/postInfo/findByCommentPage',
	// 查询帖子单条所有回复
	postInfoFfindByReplyPage: URLHost + '/postInfo/findByReplyPage',
	
	// 我的粮食买卖收藏
	grainTradingFindMyCollection: URLHost + '/grainTrading/findMyCollection',
	
	// 帖子详情
	postInfoFindByPostId: URLHost + '/postInfo/findByPostId',
	// 删除圈子评论
	commentInfoDelCommentInfo: URLHost + '/commentInfo/delCommentInfo',
	// 添加圈子回复
	replyInfoAddReplyInfo: URLHost + '/replyInfo/addReplyInfo',
	// 新增圈子评论
	addCommentInfo: URLHost + '/commentInfo/addCommentInfo',
	
	// 增加独家点评评论信息
	exclusiveAddComment: URLHost + '/exclusive/addComment',
	// 独家点评增加回复信息
	exclusiveAddReply: URLHost + '/exclusive/addReply',
	// 独家点评回复列表信息
	exclusiveFindReplyByUserId: URLHost + '/exclusive/findReplyByUserId',
	
	
	/**
	 * 慧农V_1.0 优化 接口 end
	 */
	
	
	
	
	

}
export default {
	url,
	common,
	md5,
	extendUrl,
	imUrl
}
