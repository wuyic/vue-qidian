import Vue from 'vue'
import Vuex from 'vuex'
import bookcase from './modules/bookcase'
import booklist from './modules/booklist'
import search from './modules/search'
import ad from './modules/ad'
import loading from './modules/loading'
import pay from './modules/pay'
import toast from './modules/toast'

Vue.use(Vuex);


export default new Vuex.Store({
	state: {
		serverTime: new Date().getTime()
	},

	getters: {},

	mutations: {
		setServiceTime(state, time) {
			state.serverTime = time;
		}
	},

	actions: {},

	modules: {
		bookcase: bookcase, // 书架
		booklist: booklist, // 书单
		search:   search,   // 搜索
		ad:       ad,       // 广告
		loading:  loading,  // 上拉加载 下拉刷新
		toast:    toast,    // 弹出层
		pay:      pay,      // 支付
	},
})
