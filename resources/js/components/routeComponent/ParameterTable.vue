<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Description</th>
        <th class="text-left">Type</th>
        <th class="text-left">Optional</th>
        <th class="text-left">Default</th>
        <th class="text-left">Example</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in parameters" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.type }}</td>
        <td>{{ item.isOptional ? 'yes' : 'no' }}</td>
        <td>{{ item.default ? item.default : 'N/A' }}</td>
        <td>{{ item.example }}</td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: {
    parameters: null
  },
  data() {
    return {};
  }
}
</script>