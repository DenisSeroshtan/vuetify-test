<template>
  <div>
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item
              v-for="product in promoProducts"
              :key="product.id"
              :src="product.img"
            >
              <router-link
                :to="{ name: 'ad', params: { id: product.id } }"
                tag="a"
                class="slider-wrap"
              />
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex v-for="product in products" :key="product.id" xs12 sm6 lg4>
          <v-card>
            <v-img :src="product.img" class="card-img" height="300px"></v-img>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ product.title }}</h3>
                <div>{{ product.desc }}</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :to="{ name: 'ad', params: { id: product.id } }"
                raised
                dark
                color="orange"
                >Открыть</v-btn
              >
              <!-- <buyModal v-if="userId != product.userId" :product="product"
                >Купить</buyModal
              >-->
              <!-- <v-btn raised dark color="light-blue accent-2">Купить</v-btn> -->
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import buyModal from '@/components/BuyModal'
export default {
  components: {
    buyModal
  },
  computed: {
    userId() {
      const user = this.$store.getters['user/user']
      return user != null ? user.id : user
    },
    ...mapGetters('ads', ['products', 'promoProducts'])
  }
}
</script>
<style lang="scss" scoped>
.card-img {
  min-height: 200px;
}
.v-card__actions {
  padding: 16px;
}
.slider-wrap {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
</style>
