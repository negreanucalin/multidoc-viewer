<template>
    <div>
        <div v-if="route">
            <route-description-component :route="route"></route-description-component>
            <div v-if="route.request.headers.length">
              <h4>Headers</h4>
              <headers-table :headers="route.request.headers"></headers-table>
            </div>
            <div v-if="route.request.uriParams.length">
                <h4>Url params</h4>
                <parameter-table :parameters="route.request.uriParams"></parameter-table>
            </div>
            <div v-if="route.request.postParams.length">
                <h4>Request params</h4>
                <parameter-table :parameters="route.request.postParams"></parameter-table>
            </div>
            <tag-view-component :tags="route.tags"/>
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