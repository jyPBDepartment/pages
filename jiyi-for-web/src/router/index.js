import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/introduce',
    name: 'introduce',
    component: resolve => require(['../views/Introduce.vue'], resolve)
  },
  {
    path: '/dealer_shop',
    name: 'dealer_shop',
    component: resolve => require(['../views/Dealer_shop.vue'], resolve)
  },
  {
    path: '/dealer_manager',
    name: 'dealer_manager',
    component: resolve => require(['../views/Dealer_manager.vue'], resolve)
  },
  {
    path: '/supplier_shops',
    name: 'supplier_shops',
    component: resolve => require(['../views/Supplier_shop.vue'], resolve)
  },
  {
    path: '/dealer_program',
    name: 'dealer_program',
    component: resolve => require(['../views/Dealer_program.vue'], resolve)
  },
  {
    path: '/supplier_program',
    name: 'supplier_program',
    component: resolve => require(['../views/Supplier_program.vue'], resolve)
  },
  {
    path: '/partner',
    name: 'partner',
    component: resolve => require(['../views/Partner.vue'], resolve)
  },
  {
    path: '/guarantee',
    name: 'guarantee',
    component: resolve => require(['../views/Guarantee.vue'], resolve)
  },
  {
    path: '/join',
    name: 'join',
    component: resolve => require(['../views/Join.vue'], resolve)
  },
  {
    path: '/real_time_info',
    name: 'real_time_info',
    component: resolve => require(['../views/Real_time_info.vue'], resolve)
  },
  {
    path: '/article',
    name: 'article',
    component: resolve => require(['../views/Article.vue'], resolve)
  },
  {
    path: '/download',
    name: 'download',
    component: resolve => require(['../views/Download.vue'], resolve)
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
