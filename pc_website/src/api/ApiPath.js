//正式服务器地址
// const URLHost = 'http://127.0.0.1:8080'
// //测试服务器地址
// const URLHost = 'http://127.0.0.1:8080'
//开发服务器地址
// const URLHost = 'http://29.2.180.90:8080/rtl'
const URLHost = 'http://localhost:8080'

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

}
export default {
  url
}
