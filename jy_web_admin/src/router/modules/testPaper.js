//试卷管理

import Layout from '@/layout'

const testPaperRouter = {
  path: '/testPaper',
  component: Layout,
  redirect: '/testPaper/caseInfo',
  name: 'testPaper',
  alwaysShow: true,
  meta: {
    title: '试卷管理',
    icon: 'el-icon-document',
  },
  children: [{
    path: 'question',
    component: () => import('@/views/commpage/index'),
    name: 'question',
    meta: {
      title: '试题管理'
    }
  }, ]
}
export default testPaperRouter
