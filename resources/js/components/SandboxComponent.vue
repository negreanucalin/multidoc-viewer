<template>
    <div v-if="clonedRoute">
        <route-description-component :route="clonedRoute" ></route-description-component>
        <div v-if="route.request.headers.length">
          <h4>Headers</h4>
          <headers-table :headers="route.request.headers"></headers-table>
        </div>
        <div v-if="clonedRoute.request.uriParams.length">
            <h4>Url params</h4>
            <div v-for="uriParameter in computedRoute.request.uriParams">
                <v-text-field
                        :key="uriParameter.name"
                        :label="uriParameter.name"
                        v-model="uriParameter.example"
                        required
                ></v-text-field>
            </div>
        </div>
        <div v-if="clonedRoute.request.postParams.length">
            <h4>Request params</h4>
            <div v-for="postParameter in clonedRoute.request.postParams">
                <v-text-field
                        :key="postParameter.name"
                        :label="postParameter.name"
                        v-model="postParameter.example"
                        required
                ></v-text-field>
            </div>
        </div>
    </div>
</template>

<script>
    import SandboxService from "../services/sandboxService";

    export default {
        props: {
            route: null
        },
        mounted() {
          if (this.route) {
            this.clonedRoute = _.cloneDeep(this.route);
            this.clonedRoute.request.originalUri = this.clonedRoute.request.url;
            this.clonedRoute.request.url = SandboxService.parseUrl(
                this.clonedRoute.request.originalUri,
                this.clonedRoute.request.uriParams
            );
            return this.clonedRoute;
          }
        },
        computed: {
            computedRoute: function() {
              return this.clonedRoute;
            }
        },
        data() {
            return {
                clonedRoute:null
            };
        },
        methods: {},
        watch : {
            route(to, from) {
                if (to) {
                    this.clonedRoute = _.cloneDeep(to);
                }
            }
        }
    }
</script>