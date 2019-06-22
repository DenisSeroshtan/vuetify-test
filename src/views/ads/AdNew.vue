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
            <v-btn class="warning" @click="triggerInput">
              Upload
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
            <input
              type="file"
              style="display:none"
              accept="image/*"
              ref="fileInput"
              @change="uploadFile"
            />
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <img :src="imageSrc" alt width="120" v-if="imageSrc" />
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
import { mapState } from 'vuex'
export default {
  data() {
    return {
      valid: false,
      title: '',
      description: '',
      promo: '',
      image: null,
      imageSrc: '',
      rules: {
        required: value => !!value || 'Поле обязательно для заполнения',
        counter: value => (value && value.length >= 3) || 'Мин. 3 симоволов'
      }
    }
  },
  computed: {
    ...mapState('user', ['user'])
  },
  methods: {
    createAd() {
      if (this.$refs.formLogin.validate()) {
        const ad = {
          title: this.title,
          desc: this.description,
          userId: this.user.id,
          promo: this.promo,
          img: this.image || null
        }
        this.$store
          .dispatch('ads/createAd', ad)
          .then(() => {
            // this.$refs.formLogin.reset()
            this.$router.push({ name: 'list' })
          })
          .catch(e => {
            console.log(e)
          })
      }
    },
    triggerInput() {
      this.$refs.fileInput.click()
    },
    // загрузка изображения
    uploadFile() {
      const file = event.target.files[0]

      const reader = new FileReader()
      reader.onload = () => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)

      this.image = file
    }
  }
}
</script>
