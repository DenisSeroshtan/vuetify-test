<template>
  <div>
    <v-progress-linear
      color="success"
      class="progress"
      :indeterminate="true"
      v-show="loading"
    ></v-progress-linear>

    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg4>
          <v-card class="elevation-12">
            <v-toolbar dark :class="colorForm">
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="formLogin" v-model="valid">
                <v-text-field
                  prepend-icon="person"
                  name="Login"
                  label="Email"
                  type="text"
                  v-model="email"
                  :rules="[rules.required, rules.email]"
                ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  id="password"
                  type="password"
                  v-model="password"
                  :rules="[rules.required, rules.counter]"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="onSubmit"
                :loading="loading"
                :disabled="!valid"
                color="success"
                >Отправить</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      valid: false,
      email: '',
      password: '',
      rules: {
        required: value => !!value || 'Поле обязательно для заполнения',
        counter: value => (value && value.length >= 6) || 'Мин. 6 симоволов',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Некорректный e-mail.'
        }
      }
    }
  },
  computed: {
    ...mapGetters('notify', ['loading', 'error']),
    colorForm() {
      return this.valid ? 'success' : 'light-blue accent-2'
    }
  },
  methods: {
    onSubmit() {
      if (this.$refs.formLogin.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store
          .dispatch('user/authUser', user)
          .then(() => {
            this.$router.push('/')
          })
          .catch(() => {})
      }
    }
  },
  created() {
    if (this.$route.query['loginErr']) {
      this.$store.dispatch(
        'notify/statusError',
        'Для дальнейшего просмотра необходима регистрация'
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.progress {
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
}
</style>
