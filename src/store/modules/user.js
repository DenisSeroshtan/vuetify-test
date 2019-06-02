import * as fb from 'firebase'

class User {
  constructor(id) {
    this.id = id
  }
}
export default {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    user(state) {
      return state.user
    }
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    }
  },
  actions: {
    registerUser({ commit, dispatch }, { email, password }) {
      dispatch('notify/statusError', null, { root: true })
      dispatch('notify/load', true, { root: true })
      return fb
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          commit('SET_USER', new User(user.uid))
          dispatch('notify/load', false, { root: true })
        })
        .catch(err => {
          dispatch('notify/load', false, { root: true })
          dispatch('notify/statusError', err.message, { root: true })
          throw err
        })
    },
    authUser({ commit, dispatch }, { email, password }) {
      dispatch('notify/statusError', null, { root: true })
      dispatch('notify/load', true, { root: true })
      return fb
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          commit('SET_USER', new User(user.uid))
          dispatch('notify/load', false, { root: true })
        })
        .catch(err => {
          dispatch('notify/load', false, { root: true })
          dispatch('notify/statusError', err.message, { root: true })
          throw err
        })
    }
  }
}
