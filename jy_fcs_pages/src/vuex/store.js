import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// 登录验证
export default new Vuex.Store({
    state: {
        user: false
    },
    mutations: {
        // 登录
        login(state, user) {
            state.user = user.loginName;
            localStorage.setItem("userInfo", user.loginName);
            localStorage.setItem("accountId", user.accountId);
            localStorage.setItem("roleId", user.roleId);
        },
        // 退出
        logout(state, user) {
            state.user = "";
            localStorage.setItem("userInfo", "");
            localStorage.setItem("accountId", "");
            localStorage.setItem("roleId", "");
        }
    }
})