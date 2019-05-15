<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-img
            src="https://picsum.photos/id/1/1200/400"
            height="300px"
          ></v-img>
          <v-card-text>
            <h1 class="text--primary">Title</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
              in?
            </p>
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
