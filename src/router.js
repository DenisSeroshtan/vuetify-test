import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Orders from './views/user/Orders.vue'
import Login from './views/auth/Login.vue'
import Registration from './views/auth/Registration.vue'
import AdList from './views/ads/AdList.vue'
import AdNew from './views/ads/AdNew.vue'
import Ad from './views/ads/Ad.vue'

import store from '@/store/store'

function addGuard(to, from, next) {
  store
    .dispatch('user/loginInUser')
    .then(() => {
      next()
    })
    .catch(() => {
      next('/login?loginErr=true')
    })
}

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
      path: '/orders',
      beforeEnter: addGuard
    },
    {
      component: AdList,
      name: 'list',
      path: '/list',
      beforeEnter: addGuard
    },
    {
      component: Ad,
      name: 'ad',
      path: '/ad/:id',
      props: true
    },
    {
      component: AdNew,
      name: 'newAd',
      path: '/new',
      beforeEnter: addGuard
    },
    {
      path: '*',
      redirect: {
        name: 'home'
      }
    }
  ],
  mode: 'history'
})
