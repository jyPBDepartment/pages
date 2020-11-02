//课程管理


import Layout from '@/layout'

const lessonRouter = {
  path: '/lesson',
  component: Layout,
  redirect: '/lesson/list',
  name: 'lesson',
  alwaysShow: true,
  meta: {
    title: '课程管理',
    icon: 'el-icon-office-building',
  },
  children: [{
    path: 'list',
    component: () => import('@/views/commpage/index'),
    name: 'lessonlist',
    meta: {
      title: '线下课程'
    }
  }, ]
}
export default lessonRouter
