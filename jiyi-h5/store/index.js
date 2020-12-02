import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		msgSum: 0
	},
	mutations: {
		setMsgSum(state, value) {
			// 变更状态
			state.msgSum = value;
		}
	},
	getters: {
		getMsgSum: state => {
			return state.msgSum;
		}
	},
	actions: {}
})
export default store
