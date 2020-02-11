<template>
    <div>
        <div v-if="route">
            <route-description-component :route="computedRoute"></route-description-component>
            <div v-if="computedRoute.request.uriParams.length">
                <h4>Url params</h4>
                <parameter-table :parameters="computedRoute.request.uriParams"></parameter-table>
            </div>
            <div v-if="computedRoute.request.postParams.length">
                <h4>Request params</h4>
                <parameter-table :parameters="computedRoute.request.postParams"></parameter-table>
            </div>
            <div>
                <h4 v-if="computedRoute.tags.length">Tags</h4>
                <span v-for="tag in computedRoute.tags" >
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
            computedRoute: function () {
                let newRoute = _.clone(this.route);
                newRoute.request.uriParams = _.filter(newRoute.request.params, function(parameter) { return parameter.type ==='uri'; });
                newRoute.request.postParams = _.filter(newRoute.request.params, function(parameter) { return parameter.type ==='post'; });
                return newRoute;
            }
        },
        data() {
            return {

            };
        },
        methods: {

        }
    }
</script>