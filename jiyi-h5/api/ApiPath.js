//配置后台接口
//开发环境基础路径地址
const URLHost = 'http://192.168.120.52:8080';
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

	//根据农服标题名称查询农服列表信息
	findAgriInfo: URLHost + '/agricultural/findAgriInfo',

	//根据农服标题名称查询农服列表信息
	findAgriType: URLHost + '/agricultural/findAgriType',



}
export default {
	url
}
