<template>
  <div>
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item
              v-for="product in products"
              :key="product.id"
              :src="product.img"
            ></v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex v-for="product in products" :key="product.id" xs12 sm6 md4>
          <v-card>
            <v-img :src="product.img" class="card-img"></v-img>
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
              <v-btn raised dark color="light-blue accent-2">Купить</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: [
        {
          title: 'title 1',
          desc: 'some description 2',
          promo: true,
          img: 'https://picsum.photos/id/1/1200/400',
          id: 12
        },
        {
          title: 'title 2',
          desc: 'some description 1',
          promo: false,
          img: 'https://picsum.photos/id/10/1200/400',
          id: 123
        },
        {
          title: 'title 3',
          desc: 'some description 3',
          promo: false,
          img: 'https://picsum.photos/id/100/1200/400',
          id: 1234
        }
      ]
    }
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
</style>
