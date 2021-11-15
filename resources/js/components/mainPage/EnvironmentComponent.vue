<template>
    <div>
        <v-select
                v-model="environment"
                v-on:change="setEnvironmentName"
                :items="getEnvironmentNames()"
                label="Environment"
                outlined
        ></v-select>
    </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
    export default {
        beforeCreate() {

        },
        props: {
          environment: null
        },
        mounted() {

        },
        computed: {
            ...mapState(['project']),
            ...mapGetters(['getEnvironment','getEnvironmentNames'])
        },
        data() {
            return {};
        },
        methods: {
            setEnvironmentName: function(environment) {
               this.$store.dispatch('setEnvironment', environment);
            }
        },
        watch: {
            '$store.state.environment': function(to, from) {
              this.setEnvironment(to);
            }
        }
    }
</script>