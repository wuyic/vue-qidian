import Vue from 'vue'
import Vuex from 'vuex'
import booklist from './modules/booklist'

Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    booklist:booklist,

  },
})
