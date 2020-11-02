//发布管理

import Layout from '@/layout'

const publishRouter = {
  path: '/publish',
  component: Layout,
  redirect: '/publish/agricultural',
  name: 'publish',
  meta: {
    title: '发布管理',
    icon: 'el-icon-cherry'
  },
  children: [{
      path: 'agricultural',
      component: () => import('@/views/commpage/index'),
      name: 'agricultural',
      meta: {
        title: '农服发布'
      }
    },
    {
      path: 'sellAgriMachinery',
      component: () => import('@/views/commpage/index'),
      name: 'sellAgriMachinery',
      meta: {
        title: '农机发布'
      }
    },
    {
      path: 'CornBusiness',
      component: () => import('@/views/commpage/index'),
      name: 'CornBusiness',
      meta: {
        title: '粮食买卖'
      }
    },


  ]
}
export default publishRouter
