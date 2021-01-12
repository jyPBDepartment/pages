import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import store from './store'

// 注册全局组件
import MescrollBody from "./mescroll-uni/mescroll-body.vue"
import MescrollUni from "./mescroll-uni/mescroll-uni.vue"
import {
	ajax
} from 'api/ajax.js'

import HeaderSearch from '@/components/HeaderSearch/HeaderSearch.vue';
import FilterCom from '@/components/FilterCom/FilterCom.vue'
import CommReply from '@/components/commReply/commReply.vue'

Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
Vue.component('HeaderSearch', HeaderSearch)
Vue.component('FilterCom',FilterCom)
Vue.component('CommReply',CommReply)
Vue.prototype.$ajax = ajax
Vue.prototype.$store = store
Vue.use(uView);
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
