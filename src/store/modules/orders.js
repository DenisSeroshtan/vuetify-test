import fb from 'firebase/app'
import 'firebase/database'

class Order {
  constructor({ name, phone, email, productId, userId = null, order = false }) {
    this.name = name
    this.phone = phone
    this.email = email
    this.productId = productId
    this.userId = userId
    this.order = order
  }
}
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
    async createOrder({ dispatch }, { name, phone, email, productId, userId }) {
      let newOrder = new Order({
        name,
        phone,
        email,
        productId
      })

      dispatch('notify/statusError', null, { root: true })
      try {
        await fb
          .database()
          .ref(`/user/${userId}/orders`)
          .push(newOrder)
      } catch (error) {
        dispatch('notify/statusError', error.message, { root: true })
        throw error
      }
      // await new Promise(resolve => {
      //   setTimeout(() => {
      //     commit('ADD_ORDER', newOrder)
      //     console.log(state.orders)
      //     resolve()
      //   }, 1000)
      // })
    }
  }
}
