<template>
    <div>
        <v-content>
            <v-container class="fill-height" fluid>
                <v-layout row>
                    <v-flex md3 pl-2 pr-2>
                        <environment-component></environment-component>
                        <route-tree-component v-on:selected:route="selectRoute"></route-tree-component>
                    </v-flex>
                    <v-flex md4 pl-2 pr-2>
                        <route-component :route="computedRoute"></route-component>
                    </v-flex>
                    <v-flex md5 pl-2 pr-2>
                        <sandbox-component :route="computedRoute"></sandbox-component>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-content>
    </div>
</template>

<script>
    export default {
        beforeCreate() {
            // When page loads set current route name
            this.$store.dispatch('loadProject');
            this.$store.dispatch('loadRoutes');
        },
        props: {},
        mounted() {

        },
        computed: {
            computedRoute: function () {
                if (this.selectedRoute) {
                    let newRoute = _.clone(this.selectedRoute);
                    newRoute.request.uriParams = _.filter(newRoute.request.params, function (parameter) {
                        return parameter.type === 'uri';
                    });
                    newRoute.request.postParams = _.filter(newRoute.request.params, function (parameter) {
                        return parameter.type === 'post';
                    });
                    return newRoute;
                }
                return null;
            }
        },
        data() {
            return {
                selectedRoute: null,
            };
        },
        methods: {
            selectRoute: function (route) {
                this.selectedRoute = route;
            }
        }
    }
</script>