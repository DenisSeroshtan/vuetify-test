import fb from 'firebase/app'
import 'firebase/database'

class Order {
  constructor({
    name,
    phone,
    email,
    productId,
    userId = null,
    done = false,
    id = null
  }) {
    this.name = name
    this.phone = phone
    this.email = email
    this.productId = productId
    this.userId = userId
    this.done = done
    this.id = id
  }
}
export default {
  namespaced: true,
  state: {
    orders: []
  },
  getters: {
    doneOrders(state) {
      return state.orders.filter(order => order.done === true)
    },
    undoneOrders(state) {
      return state.orders.filter(order => order.done === false)
    },
    fullOrders(state, getters) {
      return getters.undoneOrders.concat(getters.doneOrders)
    }
  },
  mutations: {
    ADD_ORDERS(state, orders) {
      state.orders = orders
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
    },
    async fetchOrders({ commit, dispatch, rootGetters }) {
      const userId = rootGetters['user/user']
        ? rootGetters['user/user'].id
        : null
      if (!userId) {
        dispatch(
          'notify/statusError',
          'Ошибка с получением заказов для данного пользователя',
          { root: true }
        )
        return
      }
      // if (!rootGetters['notify/loading']) {
      //   dispatch('notify/load', true, { root: true })
      // }

      dispatch('notify/statusError', null, { root: true })
      const resultOrders = []
      try {
        // ссылаемся на базу данных
        const ref = await fb
          .database()
          .ref(`user/${userId}/orders`)
          .once('value')
        // получаем объект с ключами по id
        const orders = ref.val()
        if (orders) {
          Object.keys(orders).forEach(key => {
            const o = orders[key]
            let dbOrder = new Order({
              name: o.name,
              phone: o.phone,
              email: o.email,
              productId: o.productId,
              done: o.done,
              id: key
            })
            resultOrders.push(dbOrder)
          })
        }
        commit('ADD_ORDERS', resultOrders)
        // dispatch('notify/load', false, { root: true })
      } catch (error) {
        dispatch('notify/load', false, { root: true })
        dispatch('notify/statusError', error.message, { root: true })
        throw error
      }
    },

    async markOrder({ dispatch, rootGetters }, id) {
      const userId = rootGetters['user/user']
        ? rootGetters['user/user'].id
        : null
      console.log(userId)
      if (!userId) {
        dispatch(
          'notify/statusError',
          'Ошибка с получением заказов для данного пользователя',
          { root: true }
        )
        return
      }
      dispatch('notify/statusError', null, { root: true })
      try {
        await fb
          .database()
          .ref(`user/${userId}/orders`)
          .child(id)
          .update({
            done: true
          })
      } catch (error) {
        dispatch('notify/statusError', error.message, { root: true })
        throw error
      }
    }
  }
}
