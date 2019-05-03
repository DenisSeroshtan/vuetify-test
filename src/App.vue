<template>
  <v-app>
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
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark color="light-blue accent-2">
      <v-toolbar-side-icon
        @click="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn :to="link.url" flat dark v-for="link in links" :key="link.title">
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      drawer: false,
      links: [
        {
          title: 'Login',
          icon: 'lock',
          url: '/login'
        },
        {
          title: 'Registration',
          icon: 'face',
          url: '/registration'
        },
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
    }
  }
}
</script>
<style lang="scss"></style>
