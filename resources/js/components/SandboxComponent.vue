<template>
    <div v-if="computedRoute">
        <route-description-component :route="computedRoute"></route-description-component>
        <div v-if="computedRoute.request.uriParams.length">
            <h4>Url params</h4>
            <div v-for="uriParameter in computedRoute.request.uriParams">
                <v-text-field
                        :label="uriParameter.name"
                        v-model="uriParameter.example"
                        required
                ></v-text-field>
            </div>
        </div>
        <div v-if="computedRoute.request.postParams.length">
            <h4>Request params</h4>
            <div v-for="uriParameter in computedRoute.request.postParams">
                <v-text-field
                        :label="uriParameter.name"
                        v-model="uriParameter.example"
                        required
                ></v-text-field>
            </div>
        </div>
    </div>
</template>

<script>
    import SandboxService from "../services/SandboxService";

    export default {
        props: {
            route: null
        },
        mounted() {
            this.clonedRoute = _.cloneDeep(this.route);
        },
        computed: {
            computedRoute: function() {
                if (this.clonedRoute) {
                    this.clonedRoute.request.url = SandboxService.parseUrl(
                        this.clonedRoute.request.url,
                        this.clonedRoute.request.uriParams
                    );
                    return this.clonedRoute;
                }
            }
        },
        data() {
            return {
                clonedRoute:null
            };
        },
        methods: {

        },
        watch : {
            route(to, from) {
                if (to) {
                    this.clonedRoute = _.cloneDeep(to);
                }
            }
        }
    }
</script>