//配置后台接口
//开发环境基础路径地址
// const URLHost = 'http://192.168.1.106:8080/jy_fcs';
const URLHost = 'http://localhost:8083';

//生产环境基础路径地址
// const URLHost = 'http://182.92.77.60/jy_fcs';

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
	findCustmerInfo: 'http://112.126.103.106:16302/jyhn-frontend/webHttpServlet'
	// 生产环境
	// findCustmerInfo:'http://112.126.103.48:16302/jyhn-frontend/webHttpServlet'
}
const url = {
	// 学习手册职业类别加载
	findTypeOfBussiness:URLHost + '/vocationInfo/occupation',
	// 学习手册查询列表
	findById:URLHost + '/manualInfo/findByName',
	// 学习手册查看详情页面
	findArticleContent:URLHost + '/manualInfo/findById',
	// 学习手册查询所有有效的标签
	findLabel:URLHost + '/manualLabel/label',

}
export default {
	url,
	common,
	md5,
	extendUrl
}
