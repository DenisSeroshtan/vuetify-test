<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Заказы</h1>
        <v-list
          subheader
          class="mb-3"
          v-for="order in fullOrders"
          :key="order.productId"
        >
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
              <v-list-tile-sub-title v-if="order.email">
                {{ order.email }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn
                class="primary"
                :to="{ name: 'ad', params: { id: order.productId } }"
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
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('orders', ['fullOrders'])
  },
  methods: {
    setDone(order) {
      order.done = true
    }
  },
  created() {
    this.$store.dispatch('orders/fetchOrders')
  }
}
</script>

<style lang="scss">
.theme--light.v-input--is-disabled input {
  color: red;
}
</style>
