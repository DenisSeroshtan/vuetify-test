<template>
  <v-app>
    <v-progress-linear
      color="success"
      class="progress"
      :indeterminate="true"
      v-show="loading"
    ></v-progress-linear>
    <v-navigation-drawer
      temporary
      app
      v-model="drawer"
      dark
      class="blue lighten-3"
    >
      <v-list>
        <v-list-tile v-for="link in links" :key="link.title" :to="link.url">
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ link.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-if="user" @click="logoutUser()">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Выход</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark color="light-blue accent-2">
      <v-toolbar-side-icon
        @click="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title @click="toHome">
        <span class="pointer">App</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn :to="link.url" flat dark v-for="link in links" :key="link.title">
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>
        <v-btn v-if="user" @click="logoutUser()" flat dark>
          <v-icon left>exit_to_app</v-icon>Выход
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
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
import { mapGetters } from 'vuex'
import { setTimeout } from 'timers'
export default {
  data() {
    return {
      timeout: false,
      drawer: false
    }
  },
  computed: {
    ...mapGetters('notify', ['error', 'loading']),
    ...mapGetters('user', ['user']),
    links() {
      let links = []
      if (this.user) {
        links = [
          {
            title: 'Orders',
            icon: 'bookmark_border',
            url: '/orders'
          },
          {
            title: 'New ad',
            icon: 'note_add',
            url: '/new'
          },
          {
            title: 'My add',
            icon: 'list',
            url: '/list'
          }
        ]
      } else if (!this.user && !this.loading) {
        links = [
          {
            title: 'Login',
            icon: 'lock',
            url: '/login'
          },
          {
            title: 'Registration',
            icon: 'face',
            url: '/registration'
          }
        ]
      }
      return links
    }
  },
  watch: {
    error() {
      setTimeout(() => {
        if (this.error != null) {
          this.clearError()
        }
      }, 5000)
    }
  },
  methods: {
    showError() {
      this.err = !this.err
    },
    clearError() {
      this.$store.dispatch('notify/statusError', null)
    },
    toHome() {
      this.$router.push({
        name: 'home'
      })
    },
    logoutUser() {
      this.$store.dispatch('user/logoutUser').then(() => {
        this.$router.push({ name: 'home' })
      })
    }
  },
  created() {
    this.$store.dispatch('user/loginInUser')
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
