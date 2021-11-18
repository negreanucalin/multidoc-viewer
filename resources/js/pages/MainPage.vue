<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-layout row>
        <v-flex md3 pl-2 pr-2>
          <environment-component v-if="hasEnvironments" :environment="environment"></environment-component>
          <route-tree-component v-on:selected:route="selectRoute"></route-tree-component>
        </v-flex>
        <v-flex md9 pl-2 pr-2 v-if="!isSandbox">
          <route-component :route="computedRoute"></route-component>
        </v-flex>
        <v-flex md9 pl-2 pr-2 v-else>
          <sandbox-component :route="computedRoute"></sandbox-component>
        </v-flex>
      </v-layout>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              v-on:click="toggleSandbox"
              elevation="2"
              fab fixed bottom right dark
              :color="isSandbox?'green':'red'"
              v-bind="attrs"
              v-on="on"
          ><v-icon>mdi-pencil</v-icon></v-btn>
        </template>
        <span>{{isSandbox?'View mode':'Sandbox'}}</span>
      </v-tooltip>

      <v-snackbar v-model="showTagSearch" :timeout=-1 color="white">
          <v-row>
            <v-col>
              <tag-view-component :tags="tagsList" :hideTitle="true"></tag-view-component>
              <v-btn outlined color="pink" class="float-right mt-2" @click="clearTagList">Clear</v-btn>
            </v-col>
          </v-row>
      </v-snackbar>

    </v-container>
  </v-main>
</template>

<script>
import {mapState} from "vuex";
import TagViewComponent from "../components/routeComponent/TagViewComponent";

export default {
  components: {TagViewComponent},
  beforeCreate() {
    // When page loads set current route name
    this.$store.dispatch('loadProject');
    this.$store.dispatch('loadRoutes');
  },
  props: {},
  mounted() {},
  computed: {
    ...mapState(['project', 'environment', 'isSandbox','tags']),
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
    },
    tagsList: function() {
      return Array.from(this.tags);
    }
  },
  data() {
    return {
      selectedRoute: null,
      showTagSearch: false
    };
  },
  methods: {
    selectRoute: function (route) {
      this.selectedRoute = route;
    },
    toggleSandbox: function () {
      this.$store.dispatch('toggleSandbox');
    },
    clearTagList: function() {
      this.$store.dispatch('clearTagSearch');
    }
  },
  watch: {
    '$store.state.tags': function(to, from) {
      this.showTagSearch = to.size > 0;
    }
  }
}
</script>