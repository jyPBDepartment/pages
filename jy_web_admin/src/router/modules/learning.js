//学习手册

import Layout from '@/layout'

const learningRouter = {
  path: '/learning',
  component: Layout,
  redirect: 'noRedirect',
  name: 'learning',
  alwaysShow: true,
  meta: {
    title: '学习手册',
    icon: 'el-icon-notebook-1',
  },
  children: [{
    path: 'learninglist',
    component: () => import('@/views/commpage/index'),
    name: 'learninglist',
    meta: {
      title: '手册列表'
    }
  }, ]
}
export default learningRouter
