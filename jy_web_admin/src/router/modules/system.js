/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const systemRouter = {
  path: '/system',
  component: Layout,
  redirect: 'noRedirect',
  name: 'system',
  meta: {
    title: '系统管理',
    icon: 'el-icon-user-solid'
  },
  children: [{
      path: 'dict',
      component: () => import('@/views/commpage/index'),
      name: 'dict',
      meta: {
        title: '字典管理'
      }
    }, {
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
      path: 'role',
      component: () => import('@/views/commpage/index'),
      name: 'role',
      meta: {
        title: '角色管理'
      }
    },
    {
      path: 'menuList',
      component: () => import('@/views/commpage/index'),
      name: 'menuList',
      meta: {
        title: '菜单管理'
      }
    },
    {
      path: 'classify',
      component: () => import('@/views/commpage/index'),
      name: 'classify',
      meta: {
        title: '分类管理'
      }
    },
    {
      path: 'logger',
      component: () => import('@/views/commpage/index'),
      name: 'logger',
      meta: {
        title: '日志管理'
      }
    },

  ]
}
export default systemRouter
