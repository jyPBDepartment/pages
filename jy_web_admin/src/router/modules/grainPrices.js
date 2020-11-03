//参数设置

import Layout from '@/layout'

const grainPricesRouter = {
  path: '/grainPrices',
  component: Layout,
  redirect: 'noRedirect',
  name: 'grainPrices',
  meta: {
    title: '参数设置',
    icon: 'el-icon-s-tools'
  },
  children: [{
      path: 'grainPricesInfo',
      component: () => import('@/views/commpage/index'),
      name: 'grainPricesInfo',
      meta: {
        title: '粮价管理'
      }
    },
    {
      path: 'grainPricesHistoryInfo',
      component: () => import('@/views/commpage/index'),
      name: 'grainPricesHistoryInfo',
      meta: {
        title: '粮价历史'
      }
    },


  ]
}
export default grainPricesRouter
