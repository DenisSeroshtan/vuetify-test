<template>
  <div>
    <v-btn
      rised
      dark
      :large="!normal"
      color="light-blue accent-2"
      @click.stop="dialog = true"
      >Купить</v-btn
    >

    <v-dialog v-model="dialog" max-width="500">
      <v-layout>
        <v-flex>
          <v-card>
            <v-layout>
              <v-flex class="px-2 py-2">
                <h3 class="text-xs-center">Покупай, а то проиграешь</h3>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-card-text>
              <v-form ref="formBuy" v-model="valid">
                <v-text-field
                  name="Name"
                  label="Name"
                  type="text"
                  v-model="name"
                  :rules="[rules.required, rules.counter]"
                ></v-text-field>
                <v-divider></v-divider>
                <v-text-field
                  name="phone"
                  label="phone"
                  type="text"
                  v-model="phone"
                  :rules="[rules.required, rules.phone]"
                ></v-text-field>
                <v-divider></v-divider>
                <v-text-field
                  name="e-mail"
                  label="e-mail"
                  type="text"
                  v-model="email"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                depressed
                flat="flat"
                @click.prevent="dialog = false"
                :disabled="localLoading"
                >Отменить</v-btn
              >
              <v-btn
                class="success"
                :loading="localLoading"
                :disabled="!valid || localLoading"
                @click.prevent="onBuy()"
                >Купить</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: {
    normal: {
      required: false,
      default: true
    },
    product: {
      type: [Object, Array],
      required: true
    }
  },
  data() {
    return {
      valid: false,
      dialog: false,
      localLoading: false,
      name: '',
      phone: '',
      email: '',
      rules: {
        required: value => !!value || 'Поле обязательно для заполнения',
        counter: value => (value && value.length >= 6) || 'Мин. 6 симоволов',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Некорректный e-mail.'
        },
        phone: value => {
          const pattern = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
          return pattern.test(value) || 'Некорректный номер телефона.'
        }
      }
    }
  },
  methods: {
    onBuy() {
      if (this.$refs.formBuy.validate()) {
        this.localLoading = true
        this.$store
          .dispatch('orders/createOrder', {
            name: this.name,
            phone: this.phone,
            email: this.email,
            productId: this.product.id,
            userId: this.product.userId
          })
          .finally(() => {
            this.dialog = false
            this.localLoading = false
            this.$refs.formBuy.reset()
          })
      }
    }
  },
  watch: {
    dialog(val) {
      if (val === false) {
        this.$refs.formBuy.reset()
      }
    }
  }
}
</script>
