//配置后台接口
//开发环境基础路径地址
// const URLHost = 'http://192.168.1.102:8080';
const URLHost = 'http://localhost:8080';

//生产环境基础路径地址
// const URLHost = 'http://60.205.246.126/jy_fcs';
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
	addCommentInfo: URLHost + '/commentInfo/addCommentInfo',

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
	//搜索我的页面中农机，农服，粮食买卖列表
	findMyPublication: URLHost + '/agricultural/findMyPublication',
	//我的页面中农机，农服，粮食买卖详情页面
	findMineId: URLHost + '/agricultural/findMineId',

}
export default {
	url
}
