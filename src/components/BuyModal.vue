<template>
  <v-layout justify-end>
    <v-btn large class="success" flat @click.stop="dialog = true">Купить</v-btn>

    <v-dialog v-model="dialog" max-width="500">
      <v-layout>
        <v-flex>
          <v-card>
            <v-card-text>
              <v-text-field
                name="Заголовок"
                label="Заголовок"
                type="text"
                v-model="title"
              ></v-text-field>
              <v-divider></v-divider>
              <v-textarea
                name="Описание"
                label="Описание"
                type="text"
                v-model="desc"
              ></v-textarea>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn depressed flat="flat" @click="dialog = false"
                >Отменить</v-btn
              >
              <v-btn class="success" @click="onSave()">Сохранить</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  props: {
    product: {
      type: [Object, Array],
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      title: this.product.title,
      desc: this.product.desc
    }
  },
  methods: {
    onSave() {
      this.dialog = false
      this.$store.dispatch('ads/updateProduct', {
        title: this.title,
        desc: this.desc,
        id: this.product.id
      })
    }
  },
  watch: {
    dialog(val) {
      if (val === false) {
        this.title = this.product.title
        this.desc = this.product.desc
      }
    }
  }
}
</script>
