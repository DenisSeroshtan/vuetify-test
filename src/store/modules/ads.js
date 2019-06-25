import * as fb from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'
// конструктор для нового объекта с продуктом
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
    products: []
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
    },
    LOAD_PRODUCTS(state, products) {
      state.products = products
    },
    UPDATE_PRODUCT(state, { title, desc, id }) {
      let innerProduct = state.products.find(product => product.id == id)
      innerProduct.title = title
      innerProduct.desc = desc
    }
  },
  actions: {
    async createAd({ commit, dispatch }, product) {
      dispatch('notify/load', true, { root: true })
      dispatch('notify/statusError', null, { root: true })
      try {
        let newProduct = new Product(product)
        // добавляем в базу данных новый продукт
        const res = await fb
          .database()
          .ref('ad-test')
          .push(newProduct)
        // добавляем изображение в хранилище
        let img
        if (newProduct.img) {
          const imageFileName = newProduct.img.name
          const imgExt = imageFileName.slice(imageFileName.lastIndexOf('.'))
          const linkStorage = `ad-test/${res.key}${imgExt}`

          const imgData = await fb
            .storage()
            .ref(linkStorage)
            .put(newProduct.img)
          img = await fb
            .storage()
            .ref()
            .child(imgData.ref.fullPath)
            .getDownloadURL()
        } else {
          img =
            'https://avatars.mds.yandex.net/get-pdb/163339/719f75e4-28db-4c91-9b9f-f046ed586ec5/s1200'
        }
        // добавляем ссылку на изображение в базу данных
        await fb
          .database()
          .ref('ad-test')
          .child(res.key)
          .update({ img })
        // загрузка изображения

        commit('SET_PRODUCT', { ...newProduct, id: res.key, img })
        dispatch('notify/load', false, { root: true })
      } catch (e) {
        dispatch('notify/load', false, { root: true })
        dispatch('notify/statusError', e.message, { root: true })
        throw e
      }
    },
    async fetchProduct({ commit, dispatch }) {
      dispatch('notify/load', true, { root: true })
      dispatch('notify/statusError', null, { root: true })
      try {
        // ссылаемся на базу данных
        const ref = await fb
          .database()
          .ref('ad-test')
          .once('value')
        // получаем объект с ключами по id
        const valProduct = ref.val()
        let newProducts = []
        Object.keys(valProduct).forEach(key => {
          const product = new Product({
            title: valProduct[key].title,
            desc: valProduct[key].desc,
            promo: valProduct[key].promo,
            id: key,
            userId: valProduct[key].userId,
            img: valProduct[key].img
          })
          newProducts.push(product)
        })
        dispatch('notify/load', false, { root: true })
        commit('LOAD_PRODUCTS', newProducts)
      } catch (e) {
        dispatch('notify/load', false, { root: true })
        dispatch('notify/statusError', e.message, { root: true })
        throw e
      }
    },
    async updateProduct({ commit, dispatch }, { title, desc, id }) {
      dispatch('notify/load', true, { root: true })
      dispatch('notify/statusError', null, { root: true })
      try {
        // update product database
        await fb
          .database()
          .ref('ad-test')
          .child(id)
          .update({
            title,
            desc
          })
        dispatch('notify/load', false, { root: true })
        commit('UPDATE_PRODUCT', { title, desc, id })
      } catch (e) {
        dispatch('notify/load', false, { root: true })
        dispatch('notify/statusError', e.message, { root: true })
        throw e
      }
    }
  }
}
