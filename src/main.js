import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'

import * as fb from 'firebase/app'

Vue.use(Vuetify, {
  theme: {
    primary: colors.lightBlue.accent2
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    const firebaseConfig = {
      apiKey: 'AIzaSyDfhgVjPCCurvCagsLKLNn9lepmduGN938',
      authDomain: 'ad-test-f5131.firebaseapp.com',
      databaseURL: 'https://ad-test-f5131.firebaseio.com',
      projectId: 'ad-test-f5131',
      storageBucket: 'ad-test-f5131.appspot.com',
      messagingSenderId: '368878215427',
      appId: '1:368878215427:web:172a9ba00f987b47'
    }
    fb.initializeApp(firebaseConfig)
  }
}).$mount('#app')
