<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left">Header</th>
        <th class="text-left">Value</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="header in headers" :key="header.name">
        <td>{{ header.name }}</td>
        <td>{{header.value}}</td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: {
    headers: null
  },
  data() {
    return {};
  }
}
</script>