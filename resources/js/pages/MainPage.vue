<template>
    <v-main>
        <v-container class="fill-height" fluid>
            <v-layout row>
                <v-flex md3 pl-2 pr-2>
                    <environment-component v-if="hasEnvironments"></environment-component>
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
    </v-main>
</template>

<script>
    import {mapState} from "vuex";
    export default {
        beforeCreate() {
            // When page loads set current route name
            this.$store.dispatch('loadProject');
            this.$store.dispatch('loadRoutes');
        },
        props: {},
        mounted() {},
        computed: {
            ...mapState(['project']),
            computedRoute: function () {
                // If selected item is not a folder
                if (this.selectedRoute && this.selectedRoute.hasOwnProperty('request')) {
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
            },
          hasEnvironments: function () {
              return this.project.hasOwnProperty('environments') && this.project.environments.length > 0;
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