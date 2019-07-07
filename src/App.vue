<template>
  <v-app>
    <v-progress-linear
      color="success"
      class="progress"
      :indeterminate="true"
      v-show="loading"
    ></v-progress-linear>
    <Header></Header>
    <v-content v-if="!loading">
      <transition
        name="custom-classes-transition"
        enter-active-class="animated lightSpeedIn"
        leave-active-class="animated lightSpeedOut"
        mode="out-in"
      >
        <router-view></router-view>
      </transition>
    </v-content>
    <v-footer app></v-footer>
    <template v-if="error">
      <v-snackbar :value="true" bottom right multi-line>
        {{ error }}
        <v-btn color="error" flat @click="clearError()">✕</v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>
<script>
import Header from '@/components/Header'
import { mapGetters } from 'vuex'
import { setTimeout } from 'timers'
export default {
  components: {
    Header
  },
  data() {
    return {
      timeout: false
    }
  },
  computed: {
    ...mapGetters('notify', ['error', 'loading']),
    ...mapGetters('ads', ['products']),
    ...mapGetters('user', ['user'])
  },
  watch: {
    error(val) {
      setTimeout(() => {
        if (val != null) {
          this.clearError()
        }
      }, 4000)
    }
  },
  methods: {
    clearError() {
      this.$store.dispatch('notify/statusError', null)
    }
  },
  created() {
    // получение списка продуктов с firebase
    if (this.products.length == 0) {
      this.$store.dispatch('ads/fetchProduct')
    }
    // поддержка сессии пользователя
    this.$store
      .dispatch('user/loginInUser')
      .catch(() => console.log('user unregister'))
  }
}
</script>
<style lang="scss" scoped>
.pointer {
  cursor: ponter;
}
.progress {
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
}
</style>
