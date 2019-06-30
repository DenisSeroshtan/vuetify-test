<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 lg8 offset-lg2>
        <v-card>
          <v-img :src="product.img" height="300px"></v-img>
          <v-card-text>
            <h1 class="text--primary">{{ product.title }}</h1>
            <p>{{ product.desc }}</p>
          </v-card-text>
          <v-card-actions class="pa-3">
            <v-spacer></v-spacer>
            <editModal :product="product" v-if="userId == product.userId" />
            <buyModal
              normal
              v-else-if="userId != product.userId"
              :product="product"
              >Купить</buyModal
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import editModal from '@/components/EditModal'
import buyModal from '@/components/BuyModal'
export default {
  components: {
    editModal,
    buyModal
  },
  props: ['id'],
  computed: {
    userId() {
      const user = this.$store.getters['user/user']
      return user != null ? user.id : user
    },
    product() {
      const id = this.id
      return this.$store.getters['ads/getProductById'](id)
    }
  }
}
</script>
