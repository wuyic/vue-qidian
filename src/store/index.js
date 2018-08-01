import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import bookcase from './modules/bookcase'
import booklist from './modules/booklist'
import search from './modules/search'
import ad from './modules/ad'
import loading from './modules/loading'
import account from './modules/account'
import toast from './modules/toast'
import chat from './modules/chat'

Vue.use(Vuex);


export default new Vuex.Store({
	state: {
		serverTime: new Date().getTime(),
	},

	getters: {},

	mutations: {
		setServiceTime(state, time) {
			state.serverTime = time;
		},
	},
	actions: {},
	modules: {
		bookcase: bookcase, // 书架
		booklist: booklist, // 书单
		search: search,   // 搜索
		ad: ad,       // 广告
		loading: loading,  // 上拉加载 下拉刷新
		toast: toast,    // 弹出层
		account: account,  // 用户
		chat: chat,     // 聊天
	},

    //设置部分缓存
	plugins: [createPersistedState({
			paths: ['bookcase', 'booklist', 'search', 'ad']
		}
	)]
})
