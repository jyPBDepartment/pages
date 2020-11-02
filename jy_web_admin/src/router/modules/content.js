//内容管理

import Layout from '@/layout'

const contentRouter = {
  path: '/content',
  component: Layout,
  redirect: '/content/caseInfo',
  name: 'content',
  alwaysShow: true,
  meta: {
    title: '内容管理',
    icon: 'el-icon-finished',
  },
  children: [{
    path: 'caseInfo',
    component: () => import('@/views/commpage/index'),
    name: 'caseInfo',
    meta: {
      title: '看图识病'
    }
  }, ]
}
export default contentRouter
