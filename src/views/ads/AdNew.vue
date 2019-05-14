<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Добавить новый заказ</h1>
        <v-form ref="formLogin" class="mb-3" v-model="valid">
          <v-text-field
            name="title"
            label="Заголовок"
            type="text"
            v-model="title"
            :rules="[rules.required]"
          ></v-text-field>
          <v-textarea
            name="description"
            label="Описание заказа"
            type="text"
            v-model="description"
            :rules="[rules.required, rules.counter]"
          ></v-textarea>
        </v-form>
        <v-layout row mb-3>
          <v-flex xs12>
            <v-btn class="warning">
              Upload
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <img src alt height="120" />
          </v-flex>
        </v-layout>
        <v-layout row class="mb-3">
          <v-flex xs12>
            <v-switch
              color="primary"
              label="Добавить на главную"
              v-model="promo"
            ></v-switch>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn class="success" :disabled="!valid" @click="createAd"
              >Добавить заказ</v-btn
            >
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      valid: false,
      title: '',
      description: '',
      promo: '',
      rules: {
        required: value => !!value || 'Поле обязательно для заполнения',
        counter: value => (value && value.length >= 3) || 'Мин. 3 симоволов'
      }
    }
  },

  methods: {
    createAd() {
      if (this.$refs.formLogin.validate()) {
        const ad = {
          title: this.titlr,
          description: this.description,
          promo: this.promo
        }
        console.log(ad)
      }
    }
  }
}
</script>
