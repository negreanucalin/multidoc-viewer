<template>
    <div>
        <v-app-bar app color="indigo" dark dense v-if="project">
            <v-toolbar-title>{{project.name}}</v-toolbar-title>
        </v-app-bar>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    export default {
        computed: {
            ...mapState(['project'])
        },
        data: () => ({

        }),
        mounted() {

        }
    }
</script>
