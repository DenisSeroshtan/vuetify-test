<template>
  <div>
    <v-container fluid pl-0 pr-0 pt-0>
      <v-progress-linear
        :indeterminate="true"
        v-show="loading"
      ></v-progress-linear>
    </v-container>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6 lg4>
          <v-card class="elevation-12">
            <v-toolbar dark :class="colorForm">
              <v-toolbar-title>Registration</v-toolbar-title>
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
                  type="password"
                  v-model="password"
                  :rules="[rules.required, rules.counter]"
                ></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  name="confirm password"
                  label="Confirm password"
                  type="password"
                  v-model="confirmPassword"
                  :rules="[rules.required, rules.equal]"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="onSubmit"
                :loading="loading"
                :disabled="!valid || loading"
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
      confirmPassword: '',
      rules: {
        required: value => !!value || 'Поле обязательно для заполнения',
        counter: value => (value && value.length >= 6) || 'Мин. 6 симоволов',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Некорректный e-mail.'
        },
        equal: value => value === this.password || 'Пароль не совпадает'
      }
    }
  },
  computed: {
    colorForm() {
      return this.valid ? 'success' : 'light-blue accent-2'
    },
    ...mapGetters('notify', ['loading', 'error'])
  },
  methods: {
    onSubmit() {
      if (this.$refs.formLogin.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }

        this.$store
          .dispatch('user/registerUser', user)
          .then(() => {
            this.$refs.formLogin.reset()
            this.$router.push({ name: 'home' })
          })
          .catch(err => console.log(err))
      }
    }
  }
}
</script>
