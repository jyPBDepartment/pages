//参数设置

import Layout from '@/layout'

const moduleInfoRouter = {
  path: '/moduleInfo',
  component: Layout,
  redirect: '/moduleInfo/funmoduleInfo',
  name: 'moduleInfo',
  meta: {
    title: '模块管理',
    icon: 'el-icon-copy-document'
  },
  children: [{
      path: 'funmoduleInfo',
      component: () => import('@/views/commpage/index'),
      name: 'funmoduleInfo',
      meta: {
        title: '功能模块管理'
      }
    },
    {
      path: 'depolyModule',
      component: () => import('@/views/commpage/index'),
      name: 'depolyModule',
      meta: {
        title: '发布模块管理'
      }
    },


  ]
}
export default moduleInfoRouter
