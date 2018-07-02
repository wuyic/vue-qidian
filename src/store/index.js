import Vue from 'vue'
import Vuex from 'vuex'
import bookcase from './modules/bookcase'
import search from './modules/search'
import ad from './modules/ad'

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
		book:   bookcase,
		search: search,
		ad:     ad,
	},
})
