//设置管理

import Layout from '@/layout'

const settingRouter = {
  path: '/setting',
  component: Layout,
  redirect: '/setting/vocationInfo',
  name: 'setting',
  meta: {
    title: '设置管理',
    icon: 'el-icon-cherry'
  },
  children: [{
      path: 'vocationInfo',
      component: () => import('@/views/commpage/index'),
      name: 'vocationInfo',
      meta: {
        title: '职业类别'
      }
    },
    {
      path: 'eduPictureInfo',
      component: () => import('@/views/commpage/index'),
      name: 'eduPictureInfo',
      meta: {
        title: '图片设置'
      }
    },
    {
      path: 'manualLabelInfo',
      component: () => import('@/views/commpage/index'),
      name: 'manualLabelInfo',
      meta: {
        title: '标签管理'
      }
    },


  ]
}
export default settingRouter
