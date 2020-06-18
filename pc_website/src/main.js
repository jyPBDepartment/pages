import Vue from 'vue'
import ElementUI from 'element-ui';
import Vant from 'vant';
import 'vant/lib/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import { pcaa } from 'area-data-vue';
import './util/area.css';
import AreaLinkageVue from 'area-linkage-vue';
Vue.prototype.$pcaa = pcaa;

Vue.use(AreaLinkageVue)

Vue.use(Vant);
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
