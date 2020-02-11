<template>
    <div>
        <v-content>
            <v-container class="fill-height" fluid>
                <v-layout row>
                    <v-flex md3>
                        <environment-component></environment-component>
                        <route-tree-component v-on:selected:route="selectRoute"></route-tree-component>
                    </v-flex>
                    <v-flex>
                        <route-component :route="selectedRoute"></route-component>
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
        computed: {},
        data() {
            return {
                selectedRoute : null,
            };
        },
        methods: {
            selectRoute: function(route) {
                this.selectedRoute = route;
            }
        }
    }
</script>