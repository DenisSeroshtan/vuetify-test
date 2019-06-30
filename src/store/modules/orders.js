export default {
  namespaced: true,
  state: {
    orders: []
  },
  getters: {},
  mutations: {
    ADD_ORDER(state, order) {
      state.orders.push(order)
    }
  },
  actions: {
    async createOrder({ state, commit }, order) {
      await new Promise(resolve => {
        setTimeout(() => {
          commit('ADD_ORDER', order)
          console.log(state.orders)
          resolve()
        }, 3000)
      })
    }
  }
}
