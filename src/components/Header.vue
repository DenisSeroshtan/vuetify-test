<template>
  <div>
    <v-navigation-drawer
      temporary
      app
      v-model="drawer"
      dark
      class="blue lighten-3"
    >
      <v-list v-if="!loading">
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
        <span class="pointer">Market</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down" v-if="!loading">
        <v-btn :to="link.url" flat dark v-for="link in links" :key="link.title">
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>
        <v-btn v-if="user" @click="logoutUser()" flat dark>
          <v-icon left>exit_to_app</v-icon>Выход
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
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
            title: 'Заказы',
            icon: 'bookmark_border',
            url: '/orders'
          },
          {
            title: 'Добавить объявление',
            icon: 'note_add',
            url: '/new'
          },
          {
            title: 'Мои объявления',
            icon: 'list',
            url: '/list'
          }
        ]
      } else {
        links = [
          {
            title: 'Вход',
            icon: 'lock',
            url: '/login'
          },
          {
            title: 'Регистрация',
            icon: 'face',
            url: '/registration'
          }
        ]
      }
      return links
    }
  },
  methods: {
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
  }
}
</script>

<style lang="scss" scoped></style>
