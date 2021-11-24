<template>
  <v-main>
    <v-container v-if="!isLoading" class="fill-height" fluid>
      <v-layout row>
        <v-flex md3 pl-2 pr-2>
          <template v-if="hasVariables">
            <v-btn v-on:click="toggleShowVariables" outlined color="pink" class="mb-2">Variables</v-btn>
            <variables-component v-if="isVariablesShow" v-on:update-variables="formatRoute"></variables-component>
          </template>
          <route-tree-component v-on:selected:route="selectRoute"></route-tree-component>
        </v-flex>
        <v-flex md9 pl-2 pr-2>
          <route-component v-if="!isSandbox" :route="computedRoute"></route-component>
          <sandbox-component v-else :route="computedRoute" :call-api="isApiCallRequested" v-on:request-done="requestDone"></sandbox-component>
        </v-flex>
      </v-layout>

      <v-speed-dial v-model="fab" fixed bottom right v-if="this.selectedRoute">
        <template v-slot:activator>
          <v-btn v-model="fab" color="blue darken-2" dark fab>
            <v-icon v-if="fab">mdi-close</v-icon>
            <v-icon v-else>mdi-settings</v-icon>
          </v-btn>
        </template>
        <v-btn v-if="isSandbox" fab dark small color="indigo" v-on:click="isApiCallRequested = true">
          <v-icon>mdi-play</v-icon>
        </v-btn>
        <v-btn fab dark small color="green" v-on:click="toggleSandbox">
          <v-icon v-if="isSandbox">mdi-newspaper</v-icon>
          <v-icon v-else>mdi-pencil</v-icon>
        </v-btn>
      </v-speed-dial>

      <v-snackbar v-model="isShowSnackbar" :timeout=-1 color="white">
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
import {mapGetters, mapState} from "vuex";
import TagViewComponent from "../components/routeComponent/TagViewComponent";
import {variableParsing} from "../mixins/variableParsing";
import {cloneDeep} from "../mixins/cloneDeep";

export default {
  mixins: [variableParsing, cloneDeep],
  components: {TagViewComponent},
  beforeCreate() {
    // When page loads set current route name
    this.$store.dispatch('loadProject');
    this.$store.dispatch('loadRoutes');
  },
  props: {},
  mounted() {
  },
  computed: {
    ...mapState(['project', 'isSandbox', 'tags', 'isLoading', 'variables']),
    ...mapGetters(['hasVariables']),
    tagsList: function () {
      return Array.from(this.tags);
    }
  },
  data() {
    return {
      fab:false,
      selectedRoute: null,
      computedRoute: null,
      isShowSnackbar: false,
      isVariablesShow:false,
      isApiCallRequested:false
    };
  },
  methods: {
    selectRoute: function (route) {
      this.computedRoute = null;
      this.selectedRoute = null;
      if (route && route.hasOwnProperty('request')) {
        this.selectedRoute = this.cloneDeep(route);
        this.formatRoute();
      }
    },
    formatRoute: function () {
      this.computedRoute = this.parseVariablesAndFormat(
          this.cloneDeep(this.selectedRoute)
      );
    },
    toggleSandbox: function () {
      this.$store.dispatch('toggleSandbox');
    },
    clearTagList: function () {
      this.$store.dispatch('clearTagSearch');
    },
    toggleShowVariables: function () {
      this.isVariablesShow = !this.isVariablesShow;
    },
    requestDone: function () {
      this.isApiCallRequested = false;
    }
  },
  watch: {
    '$store.state.tags': function (to, from) {
      this.isShowSnackbar = to.size > 0;
    }
  }
}
</script>