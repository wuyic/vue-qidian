import Vue from 'vue'
import Vuex from 'vuex'
import book from './modules/bookcase'

Vue.use(Vuex);


export default new Vuex.Store({
  state:{
    serverTime:new Date().getTime()
  },

  getters:{

  },

  mutations:{
    setServiceTime(state, time) {
      state.serverTime = time;
    }
  },

  actions:{

  },

  modules: {
    book:book,

  },
})
