<template>
    <div>
        <div v-if="route">
            <route-description-component :route="route"></route-description-component>
            <div v-if="route.request.uriParams.length">
                <h4>Url params</h4>
                <parameter-table :parameters="route.request.uriParams"></parameter-table>
            </div>
            <div v-if="route.request.postParams.length">
                <h4>Request params</h4>
                <parameter-table :parameters="route.request.postParams"></parameter-table>
            </div>
            <div>
                <h4 v-if="route.tags.length">Tags</h4>
                <span v-for="tag in route.tags" >
                    <v-chip class="ma-2">{{tag}}</v-chip>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
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