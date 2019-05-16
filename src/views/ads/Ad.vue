<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-img :src="product.img" height="300px"></v-img>
          <v-card-text>
            <h1 class="text--primary">{{ product.title }}</h1>
            <p>{{ product.desc }}</p>
          </v-card-text>
          <v-card-actions class="pa-3">
            <v-spacer></v-spacer>
            <v-btn large class="warning" flat>Редактировать</v-btn>
            <v-btn large class="success">Купить</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: ['id'],
  computed: {
    product() {
      const id = this.id
      return this.$store.getters['ads/getProductById'](id)
    }
  }
}
</script>
