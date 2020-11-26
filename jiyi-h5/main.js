import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
// 注册全局组件
import MescrollBody from "./mescroll-uni/mescroll-body.vue"
import MescrollUni from "./mescroll-uni/mescroll-uni.vue"
import {
	ajax
} from 'api/ajax.js'

import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue';

Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
Vue.component('HeaderSearch', HeaderSearch)
Vue.prototype.$ajax = ajax

Vue.use(uView);
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
