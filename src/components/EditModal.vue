<template>
  <v-layout justify-end mr-2>
    <v-btn large class="warning" flat @click.stop="dialog = true"
      >Редактировать</v-btn
    >

    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline"
          >Use Google's location service?</v-card-title
        >

        <v-card-text>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn depressed flat="flat" @click="dialog = false">Отменить</v-btn>

          <v-btn class="success">Сохранить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      dialog: false
    }
  }
}
</script>
