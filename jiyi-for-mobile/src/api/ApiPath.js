//云开发服务器地址
const URLHost = 'http://60.205.246.126/jy_system'
// const URLHost = 'http://localhost:8080'

const url = {

  //问卷调查添加
  saveQuestion:URLHost+'/questionnaire/save',
  //预约添加
  saveFloat:URLHost+'/appointment/add',
  //文章管理
  articleFindTop:URLHost+'/article/findTop',

  findByIdArticle:URLHost+'/article/findById',
  findIsRelease:URLHost+'/article/findIsRelease',
  findIsRecommend:URLHost+'/article/findIsRecommend',
  findOn:URLHost+'/article/findOn',
  //公众号图片
  findAll:URLHost + '/websiteInfo/findById',
  //logo图片
  info:URLHost + '/websiteInfo/findById',
  //网站名称
  showName:URLHost + '/websiteInfo/findById',
  //网站热线电话
  showPhone:URLHost + '/websiteInfo/findById',
  //首页轮播图
  findRotation:URLHost + '/banner/findAll',
}
export default {
  url
}
