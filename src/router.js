import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Orders from './views/Orders.vue'
import Registration from './views/Registration.vue'
import AdList from './views/ads/AdList.vue'
import AdNew from './views/ads/AdNew.vue'
import Ad from './views/ads/Ad.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      component: Home,
      name: 'home',
      path: '/'
    },
    {
      component: Login,
      name: 'login',
      path: '/login'
    },
    {
      component: Registration,
      name: 'reg',
      path: '/registration'
    },
    {
      component: Orders,
      name: 'orders',
      path: '/orders'
    },
    {
      component: AdList,
      name: 'list',
      path: '/list'
    },
    {
      component: Ad,
      name: 'ad',
      path: '/ad/:id'
    },
    {
      component: AdNew,
      name: 'newAd',
      path: '/new'
    }
  ],
  mode: 'history'
})
