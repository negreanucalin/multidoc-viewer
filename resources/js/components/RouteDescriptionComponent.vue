<template>
    <div>
        <v-chip class="ma-2" text-color="white" :color="getColorByMethod(route.request.method)">
            {{route.request.method}}
        </v-chip> {{route.name}}
        <h3>Url</h3>
        <blockquote>
            <p>{{parseEnvironment(route.request.url)}}</p>
        </blockquote>
        <h3>Description</h3>
        <p>{{route.description}}</p>
    </div>
</template>

<script>
    import {methodColor} from "../mixins/methodColoringMixin";
    import {urlParsing} from "../mixins/urlParsing";

    export default {
        mixins: [methodColor, urlParsing],
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