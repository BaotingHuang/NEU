import Vue from 'vue'
import Vuex from 'vuex'
import newsQueries from './modules/newsQueries'
import appData from './modules/appData'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    appData,
    newsQueries,
  },
})
