//配置后台接口
//开发环境基础路径地址
const URLHost = 'http://localhost:8080';
//生产环境基础路径地址
// const URLHost = 'http://60.205.246.126/jy_fcs';
const url = {
	
	//发布
	//根据不同类型发布信息
	deploy: URLHost + '/agricultural/addAcquisition'

}
export default {
	url
}