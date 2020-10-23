import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './util/area.css';
import './assets/rests.css'
import AreaLinkageVue from 'area-linkage-vue';
Vue.config.productionTip = false
Vue.use(AreaLinkageVue)


router.beforeEach((to, from, next) => {
  console.log(to)
  let title = to.meta.title
  window.document.title = title ? "吉易慧农-" + title : "吉易慧农"
  console.log(title)
  next()
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
