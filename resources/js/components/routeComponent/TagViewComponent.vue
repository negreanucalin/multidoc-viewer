<template>
    <span>
      <template v-if="tags && tags.length">
      <h4 v-if="!hideTitle">Tags</h4>
      <span v-for="tag in tags">
          <v-chip class="ma-2" color="blue" text-color="white" v-on:click="toggleTag(tag)">{{ tag }}</v-chip>
      </span>
      </template>
    </span>
</template>

<script>

export default {
  props: {
    tags: null,
    hideTitle: false
  },
  mounted() {
  },
  computed: {},
  data() {
    return {};
  },
  methods: {
    toggleTag: function (tag) {
      this.$store.dispatch('toggleTag', tag);
    }
  }
}
</script>