import Vue from 'vue'
import Vuex from 'vuex'
import bookcase from './modules/bookcase'
import booklist from './modules/booklist'
import search from './modules/search'
import ad from './modules/ad'
import loading from './modules/loading'

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
		bookcase: bookcase,
		booklist: booklist,
		search:   search,
		ad:       ad,
		loading:  loading,
	},
})
