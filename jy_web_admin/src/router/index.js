import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import grainPricesRouter from './modules/grainPrices'
import systemRouter from './modules/system'
import moduleInfoRouter from './modules/moduleInfo'

import momentsRouter from './modules/moments'
import publishRouter from './modules/publish'
import contentRouter from './modules/content'

import settingRouter from './modules/setting'

import testPaperRouter from './modules/testPaper'
import lessonRouter from './modules/lesson'
import learningRouter from './modules/learning'

/**
 * 公共路由 不需要权限
 */
export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path(.*)',
    component: () => import('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/auth-redirect',
  component: () => import('@/views/login/auth-redirect'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/error-page/404'),
  hidden: true
},
{
  path: '/401',
  component: () => import('@/views/error-page/401'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    component: () => import('@/views/dashboard/index'),
    name: '首页',
    meta: {
      title: '首页',
      icon: 'dashboard',
      affix: true
    }
  }]
},
{
  path: '/test',
  component: Layout,
  redirect: '/test',
  children: [{
    path: 'testimage',
    component: () => import('@/views/example/image'),
    name: '图片',
    meta: {
      title: '图片',
      icon: 'test',
      affix: true
    }
  }]
},

{
  path: '/profile',
  component: Layout,
  redirect: '/profile/index',
  hidden: true,
  children: [{
    path: 'index',
    component: () => import('@/views/profile/index'),
    name: '个人中心',
    meta: {
      title: 'profile',
      icon: 'user',
      noCache: true
    }
  }]
}
]

/**
 * 动态添加路由 通过权限过滤的路由
 */
export const asyncRoutes = [
  grainPricesRouter,
  moduleInfoRouter,
  publishRouter,
  momentsRouter,
  contentRouter,
  systemRouter,
  settingRouter,
  learningRouter,
  testPaperRouter,
  lessonRouter,

  // 404 页面一定要放到最后
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router