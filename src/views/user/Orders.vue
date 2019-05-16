<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Заказы</h1>
        <v-list subheader two-line v-for="order in orders" :key="order.id">
          <v-list-tile>
            <v-list-tile-action>
              <v-checkbox
                :input-value="order.done"
                :disabled="order.done"
                @change="setDone(order)"
              ></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ order.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ order.phone }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn
                class="primary"
                :to="{ name: 'ad', params: { id: order.idAd } }"
                >Открыть</v-btn
              >
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      orders: [
        {
          id: 'qwerty',
          name: 'den',
          phone: '8-999-432-23-43',
          done: false,
          idAd: '123'
        }
      ]
    }
  },
  methods: {
    setDone(order) {
      order.done = true
    }
  }
}
</script>

<style lang="scss">
.theme--light.v-input--is-disabled input {
  color: red;
}
</style>
