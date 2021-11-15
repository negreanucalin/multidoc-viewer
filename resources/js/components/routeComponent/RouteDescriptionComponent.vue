<template>
    <div>
        <div class="mb-2" v-if="!isInSandbox">
          <v-chip text-color="white" :color="getColorByMethod(route.request.method)">
            {{route.request.method}}
          </v-chip> {{route.name}}
        </div>
        <h3>Endpoint</h3>
        <blockquote>
            <p>{{parseEnvironment(route.request.url)}}</p>
        </blockquote>
        <template v-if="!isInSandbox">
          <h3>Description</h3>
          <p>{{route.description}}</p>
        </template>
    </div>
</template>

<script>
    import {methodColor} from "../../mixins/methodColoringMixin";
    import {urlParsing} from "../../mixins/urlParsing";

    export default {
        mixins: [methodColor, urlParsing],
        props: {
            route: null,
            isInSandbox:{
              type: Boolean,
              required: false,
              default: false
            }
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