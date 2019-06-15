import * as fb from 'firebase/app'
import 'firebase/database'

class Product {
  constructor({
    title,
    desc,
    userId = null,
    img = '',
    promo = false,
    id = null
  }) {
    this.title = title
    this.desc = desc
    this.userId = userId
    this.img = img
    this.promo = promo
    this.id = id
  }
}
export default {
  namespaced: true,
  state: {
    products: [
      {
        title: 'title 1',
        desc: 'some description 2',
        promo: false,
        img: 'https://picsum.photos/id/1/1200/400',
        id: 1
      },
      {
        title: 'title 2',
        desc: 'some description 1',
        promo: true,
        img: 'https://picsum.photos/id/10/1200/400',
        id: 2
      },
      {
        title: 'title 3',
        desc: 'some description 3',
        promo: true,
        img: 'https://picsum.photos/id/100/1200/400',
        id: 3
      }
    ]
  },
  getters: {
    products(state) {
      return state.products
    },
    promoProducts(state) {
      return state.products.filter(product => product.promo)
    },
    selfProducts(state) {
      return state.products
    },
    getProductById: state => id => {
      return state.products.find(product => product.id === id)
    }
  },
  mutations: {
    SET_PRODUCT(state, product) {
      state.products.push(product)
    }
  },
  actions: {
    async createAd({ commit, dispatch }, product) {
      dispatch('notify/load', true, { root: true })
      dispatch('notify/statusError', null, { root: true })
      try {
        let newProduct = new Product(product)
        const res = await fb
          .database()
          .ref('ad-test')
          .push(newProduct)

        dispatch('notify/load', false, { root: true })

        commit('SET_PRODUCT', { ...newProduct, id: res.key })
      } catch (e) {
        dispatch('notify/load', false, { root: true })
        dispatch('notify/statusError', e.message, { root: true })
        throw e
      }
    }
  }
}
