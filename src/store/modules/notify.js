export default {
  namespaced: true,
  state: {
    loading: false,
    error: null
  },
  getters: {
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    }
  },
  mutations: {
    SET_LOADING(state, status) {
      state.loading = status
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },
  actions: {
    // состояние загрузки
    load({ commit }, status) {
      commit('SET_LOADING', status)
    },
    // отображение ошибок
    statusError({ commit }, error) {
      commit('SET_ERROR', error)
    }
  }
}
