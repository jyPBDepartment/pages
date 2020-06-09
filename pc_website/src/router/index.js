import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: '首页',
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
    path: '/join',
    name: 'join',
    component: () => import('../views/Join.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
