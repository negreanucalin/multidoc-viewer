import Vue from 'vue'
import Vuex from 'vuex'
import ProjectService from "../services/api/ProjectService";

Vue.use(Vuex);

export const main = new Vuex.Store({
    actions: {
        loadProject() {
            ProjectService.get().then(response => {
                main.commit('SET_PROJECT', response);
            });
        },
        loadRoutes() {
            ProjectService.getRoutes().then(response => {
                main.commit('SET_ROUTES', response);
            });
        },
        setEnvironment({ commit }, name) {
            main.commit('SET_ENVIRONMENT', name);
        },
    },
    mutations: {
        SET_PROJECT(state, project) {
            state.project = project;
        },
        SET_ROUTES(state, routeList) {
            state.routeList = routeList;
        },
        SET_ENVIRONMENT(state, environment) {
            state.environment = environment;
        },
    },
    state: {
        project: {},
        routeList: [],
        environment :''
    },
    getters: {
        getProject: state => () => {
            return state.project;
        },
        getRoutes: state => () => {
            return state.routeList;
        },
        getEnvironmentByName: (state) => (name) => {
            return _.find(state.project.environments, (environment) => {
                return environment.name === name
            });
        }
    }
});
