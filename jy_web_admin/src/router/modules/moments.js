//圈子管理

import Layout from '@/layout'

const momentsRouter = {
  path: '/moments',
  component: Layout,
  redirect: '/moments/postInfo',
  name: 'system',
  meta: {
    title: '圈子管理',
    icon: 'el-icon-bangzhu'
  },
  children: [{
      path: 'postInfo',
      component: () => import('@/views/commpage/index'),
      name: 'postInfo',
      meta: {
        title: '帖子管理'
      }
    },
    {
      path: 'comment',
      component: () => import('@/views/commpage/index'),
      name: 'comment',
      meta: {
        title: '评价管理'
      }
    },
    {
      path: 'reply',
      component: () => import('@/views/commpage/index'),
      name: 'reply',
      meta: {
        title: '回复管理'
      }
    },
    {
      path: 'KeyWord',
      component: () => import('@/views/commpage/index'),
      name: 'KeyWord',
      meta: {
        title: '关键词管理'
      }
    },


  ]
}
export default momentsRouter
