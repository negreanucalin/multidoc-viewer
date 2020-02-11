import Vue from 'vue'
import Vuetify, { VApp, VLayout } from 'vuetify/lib'

Vue.use(Vuetify,{
    components: { VApp, VLayout, iconfort:'md' },
});

const opts = {};

export default new Vuetify(opts);
