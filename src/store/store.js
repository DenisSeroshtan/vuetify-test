import Vue from 'vue'
import Vuex from 'vuex'

import ads from './modules/ads'
import user from './modules/user'
import notify from './modules/notify'
import orders from './modules/orders'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ads,
    user,
    notify,
    orders
  }
})
