import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentPostId:null,
    Searched_users:[],
  },
  getters: {
    getId(state) {
      return state.currentPostId;
    },
    getUsers(state) {
      return state.Searched_users;
    },
  },
  mutations: {
    setCurrentPostId(state, postId) {
      state.currentPostId = postId;
    },
    setSearchedUser(state, users) {
      state.Searched_users = users;
    },
  },
  actions: {
  },
  modules: {
  }
})

