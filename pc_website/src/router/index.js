import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    name: '',
    component: Home
  },
  {
    path: '/introduce',
    name: 'introduce',
    component: () => import('../views/Introduce.vue')
  },
  {
    path: '/dealer_shop',
    name: 'dealer_shop',
    component: () => import('../views/Dealer_shop.vue')
  },
  {
    path: '/dealer_shop',
    name: 'dealer_shop',
    component: () => import('../views/Dealer_shop.vue')
  },
  {
    path: '/dealer_manager',
    name: 'dealer_manager',
    component: () => import('../views/Dealer_manager.vue')
  },
  {
    path: '/supplier_shops',
    name: 'supplier_shops',
    component: () => import('../views/Supplier_shop.vue')
  },
  {
    path: '/dealer_program',
    name: 'dealer_program',
    component: () => import('../views/Dealer_program.vue')
  },
  {
    path: '/supplier_program',
    name: 'supplier_program',
    component: () => import('../views/Supplier_program.vue')
  },
  {
    path: '/partner',
    name: 'partner',
    component: () => import('../views/Partner.vue')
  },
  {
    path: '/guarantee',
    name: 'guarantee',
    component: () => import('../views/Guarantee.vue')
  },
  {
    path: '/join',
    name: 'join',
    component: () => import('../views/Join.vue')
  },
  {
    path: '/real_time_info',
    name: 'real_time_info',
    component: () => import('../views/Real_time_info.vue')
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('../views/Article.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
