<template>
  <div>
    <template v-if="projectHasVariables">
      <div v-for="(variableProperties, variable) in project.variables" :key="variable">
        <div v-if="variableProperties.hasOwnProperty('values')">
          <v-select
              v-model="selectedData[variable]"
              :items="getVariableValues(variable)"
              :label="variableProperties.description"
              v-on:change="(value)=>{setVariable(variable, value)}"
              outlined
          ></v-select>
        </div>
        <div v-else>
          <v-text-field
              v-model="selectedData[variable]"
              :label="variableProperties.description"
              v-on:input="(value)=>{setVariable(variable, value)}"
              outlined
          ></v-text-field>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
  computed: {
    ...mapState(['project']),
    ...mapGetters(['getVariableValues', 'getVariableKey', 'projectHasVariables','getVariables'])
  },
  beforeMount() {
    let selectedData = {};
    for (let variable of this.getVariables()) {
      selectedData[variable] = this.getVariableKey(variable)
    }
    this.selectedData = selectedData;
  },
  data() {
    return {
      selectedData: null
    };
  },
  methods: {
    setVariable: function (variable, value) {
      this.$store.dispatch('setVariable', {name: variable, value: value});
      this.$emit('update-variables');
    }
  }
}
</script>