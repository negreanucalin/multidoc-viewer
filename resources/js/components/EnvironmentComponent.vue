<template>
    <div>
        <v-select
                v-model="selectedEnvironment"
                :items="environments"
                label="Environment"
                outlined
        ></v-select>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    export default {
        beforeCreate() {

        },
        props: {},
        mounted() {

        },
        computed: {
            ...mapState(['project']),
            environments : function() {
                let list = [];
                _.each(this.project.environments, (environment)=>{
                    list.push(environment.name);
                });
                return list;
            }
        },
        data() {
            return {
                selectedEnvironment: '',
            };
        },
        methods: {
            setEnvironment: function(environment) {
                this.$store.dispatch('setEnvironment', environment);
            }
        },
        watch: {
            selectedEnvironment(to, from) {
                this.setEnvironment(this.selectedEnvironment);
            },
            environments(to, from) {
                if (to.length) {
                    this.selectedEnvironment = to[0];
                    this.setEnvironment(this.selectedEnvironment);
                }
            }
        }
    }
</script>