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
  mutations: {},
  actions: {}
}
