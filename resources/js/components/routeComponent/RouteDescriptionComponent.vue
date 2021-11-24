<template>
    <div>
        <div class="mb-2">
          <v-chip text-color="white" :color="getColorByMethod(route.request.method)">
            {{route.request.method}}
          </v-chip> {{route.name}}
        </div>
        <h3><route-secured-icon v-if="route.request.isSecured"/>Endpoint</h3>
        <blockquote>
            <p>{{route.request.url}}</p>
        </blockquote>
        <template>
          <h3>Description</h3>
          <p>{{route.description}}</p>
        </template>
    </div>
</template>

<script>
    import {methodColor} from "../../mixins/methodColoringMixin";

    export default {
      mixins: [methodColor],
        props: {
            route: null
        },
        mounted() {

        },
        computed: {

        },
        data() {
            return {

            };
        },
        methods: {

        }
    }
</script>