/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: '/system/account',
  name: 'system',
  meta: {
    title: '系统管理',
    icon: 'table'
  },
  children: [{
      path: 'account',
      component: () => import('@/views/system/account/index'),
      name: 'account',
      meta: {
        title: '账户管理'
      }
    },
    {
      path: 'power',
      component: () => import('@/views/system/power/index'),
      name: 'power',
      meta: {
        title: '权限管理'
      }
    },
    {
      path: 'dict',
      component: () => import('@/views/system/dict/index'),
      name: 'dict',
      meta: {
        title: '字典管理'
      }
    },
    {
      path: 'user',
      component: () => import('@/views/system/user/index'),
      name: 'user',
      meta: {
        title: '用户管理'
      }
    }

  ]
}
export default systemRouter
