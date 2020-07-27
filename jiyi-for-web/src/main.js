import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { pcaa } from 'area-data-vue';
import './util/area.css';
import AreaLinkageVue from 'area-linkage-vue';
Vue.prototype.$pcaa = pcaa;
Vue.config.productionTip = false
Vue.use(AreaLinkageVue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
