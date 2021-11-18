<template>
  <v-tooltip top>
    <template v-slot:activator="{ on, attrs }">
      <v-icon color="red"
              v-bind="attrs"
              v-on="on"
      >mdi-exclamation</v-icon>
    </template>
    <span>Route is secured</span>
  </v-tooltip>
</template>