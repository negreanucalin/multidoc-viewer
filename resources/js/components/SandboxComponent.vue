<template>
  <div v-if="clonedRoute">
    <route-description-component :route="clonedRoute"></route-description-component>
    <div v-if="route.request.headers.length">
      <h4>Headers</h4>
      <headers-table :headers="route.request.headers"></headers-table>
    </div>
    <div v-if="clonedRoute.request.uriParams.length">
      <h4>Url params</h4>
      <div v-for="uriParameter in clonedRoute.request.uriParams">
        <v-select v-if="uriParameter.hasOwnProperty('values')"
          v-model="uriParameter.example"
          :items="uriParameter.values"
          :label="uriParameter.name"
          v-on:change="changeUrl">
        </v-select>
        <v-text-field v-else
            :key="uriParameter.name"
            :label="uriParameter.name"
            v-model="uriParameter.example"
            required
            v-on:input="changeUrl"
        ></v-text-field>
      </div>
    </div>
    <div v-if="clonedRoute.request.postParams.length">
      <h4>Request params</h4>
      <div v-for="postParameter in clonedRoute.request.postParams">
        <v-select v-if="postParameter.hasOwnProperty('values')"
          v-model="postParameter.example"
          :items="postParameter.values"
          :label="postParameter.name"
          v-on:change="changeUrl">
        </v-select>
        <v-text-field v-else
            :key="postParameter.name"
            :label="postParameter.name"
            v-model="postParameter.example"
            required
        ></v-text-field>
      </div>
    </div>
    <tag-view-component :tags="clonedRoute.tags"/>

    <v-dialog v-model="showResponseModal" max-width="900">
      <v-card v-if="apiResponse">
        <v-card-title class="text-h5">Status: {{apiResponse.status}}</v-card-title>
        <v-card-text v-if="apiResponse">
          <h4>Headers</h4>
          <vue-json-pretty :data="apiResponse.headers" />
          <h4>Data</h4>
          <vue-json-pretty :deep="3" :data="apiResponse.data" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="showResponseModal = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isLoading" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>Please stand by
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import {variableParsing} from "../mixins/variableParsing";
import {SandboxService} from "../services/api/SandboxService";
import 'vue-json-pretty/lib/styles.css';
import {cloneDeep} from "../mixins/cloneDeep";

let service = new SandboxService();
export default {
  mixins: [variableParsing, cloneDeep],
  props: {
    route: null,
    callApi: null
  },
  mounted() {
    if (this.route) {
      this.clonedRoute = this.cloneDeep(this.route);
      this.changeUrl();
    }
  },
  data() {
    return {
      clonedRoute: null,
      apiResponse: null,
      showResponseModal: false,
      isLoading:false
    };
  },
  methods: {
    changeUrl: function () {
      this.clonedRoute.request.url = this.parseUrl(
          this.route.request.url,
          this.clonedRoute.request.uriParams
      );
    },
    makeApiCall: async function () {
      this.isLoading = true;
      try {
        this.apiResponse = await service.makeCallOnRoute(this.clonedRoute.request);
      } catch (e) {
        if (e.response) {
          this.apiResponse = e.response;
        }
      } finally {
        this.$emit('request-done');
        this.showResponseModal = true;
        this.isLoading = false;
      }
    }
  },
  watch: {
    route(to, from) {
      if (to) {
        if (to) {
          this.clonedRoute = this.cloneDeep(to);
          this.changeUrl();
        }
      }
    },
    callApi: function (to, from) {
      if (to) {
        this.makeApiCall();
      }
    }
  }
}
</script>