<template>
  <v-container grid-list-lg>
    <v-layout row>
      <v-flex xs12 sm8 offser-sm2>
        <h1 class="text--secondary mb-3">Мои обЪявления</h1>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="products.length > 0">
      <v-flex xs12 sm6 v-for="product in products" :key="product.id">
        <v-card class="evalation-6 mb-3">
          <v-layout row>
            <v-flex xs4 class="pa-0">
              <v-img :src="product.img" height="100%" />
            </v-flex>
            <v-flex xs8>
              <v-card-text>
                <h2 class="text--secondary mb-3">{{ product.title }}</h2>
                <p>{{ product.desc }}</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  class="primary"
                  :to="{ name: 'ad', params: { id: product.id } }"
                  >Открыть</v-btn
                >
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex>
        <h3 class="text-secondary mb-3">У вас еще нет ни одного обЪявления</h3>
        <router-link :to="{ name: 'newAd' }" class="accent-link"
          >Добавить объявление</router-link
        >
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  computed: {
    products() {
      return this.$store.getters['ads/selfProducts']
    }
  }
}
</script>
<style scoped lang="scss">
.accent-link {
  color: #4fc3f7;
  font-size: 18px;
  &:hover {
    text-decoration: none;
  }
}
</style>
