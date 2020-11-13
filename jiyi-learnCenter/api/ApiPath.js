//配置后台接口
//开发环境基础路径地址
// const URLHost = 'http://192.168.1.106:8080/jy_fcs';
const URLHost = 'http://192.168.1.106:8080/jy_edu';
// const URLHost = 'http://localhost:8083';

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
	findCustmerInfo: 'http://112.126.103.106:16302/jyhn-frontend/webHttpServlet',
	// 生产环境
	// findCustmerInfo:'http://112.126.103.48:16302/jyhn-frontend/webHttpServlet'
	getQuestionListByExamId:'http://192.168.1.108:8083/examPaperInfo/submitExam'
}
const url = {
	// 学习手册职业类别加载
	occupation: URLHost + '/vocationInfo/occupation',
	// 学习手册查询列表
	findManualByName: URLHost + '/manualInfo/findManualByName',
	// 学习手册查看详情页面
	findManualInfoId: URLHost + '/manualInfo/findManualInfoId',
	// 学习手册查询所有有效的标签
	label: URLHost + '/manualLabel/label',
	//学习手册收藏
	saveUserManualInfo: URLHost + '/manualInfo/saveUserManualInfo',
	// 首页加载banner图
	getListByType: URLHost + '/pictureInfo/getListByType',
	// 我的考试成绩加载列表
	getExamResultByUserId: URLHost + '/mine/getExamResultByUserId',
	// 我的收藏加载列表
	getManualListByUserId: URLHost + '/mine/getManualListByUserId',
	//线下课程报名
	enrollLesson: URLHost + '/lesson/enrollLesson',
	// 首页加载热门课程
	getListByReading: URLHost + '/manualInfo/getListByReading',
	// 首页加载线下课程
	getListByLessonDay: URLHost + '/lesson/getListByLessonDay',
	// 根据职业类型Id加载试卷列表信息
	getExamListByVocationId: URLHost + '/examPaperInfo/getExamListByVocationId',
	// 根据试卷Id加载试题列表信息
	getQuestionListByExamId: URLHost + '/questionInfo/getQuestionListByExamId',
	// 试卷提交
	submitExam:URLHost+'/examPaperInfo/submitExam',
	//线下课程列表
	findLessonPage:URLHost+'/lesson/findLessonPage',
	//线下课程详情	findByLessonId:URLHost+'/lesson/findByLessonId',	//线下课程取消报名	cancellationRegistr:URLHost+'/lesson/cancellationRegistr',
	// 查询学习考试列表信息
	findStudyExamInfo:URLHost+'/studyExam/findStudyExamInfo',
	// 我的报名课程加载
	getLessonsByUserId:URLHost+'/lesson/getLessonsByUserId'
}
export default {
	url,
	common,
	md5,
	extendUrl
}
