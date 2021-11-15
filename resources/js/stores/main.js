import Vue from 'vue'
import Vuex from 'vuex'
import ProjectService from "../services/api/ProjectService";

Vue.use(Vuex);

export const main = new Vuex.Store({
    actions: {
        async loadProject() {
            let project = await ProjectService.get();
            main.commit('SET_PROJECT', project);
            if (project.hasOwnProperty('environments')) {
                main.commit('SET_ENVIRONMENT', project.environments[0].name);
            }
        },
        async loadRoutes() {
            let response = await ProjectService.getRoutes();
            main.commit('SET_ROUTES', response);
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
        getEnvironment: state => () => {
            return state.environment;
        },
        getProject: state => () => {
            return state.project;
        },
        getRoutes: state => () => {
            return state.routeList;
        },
        getEnvironments: state => () => {
            if (state.project.hasOwnProperty('environments') && state.project.environments.length) {
                return state.project.environments;
            }
        },
        getEnvironmentNames:state => () => {
            if (state.project.hasOwnProperty('environments') && state.project.environments.length) {
                let list = [];
                state.project.environments.forEach((environment)=>{
                    list.push(environment.name);
                })
                return list;
            }
        },
        getEnvironmentByName: (state) => (name) => {
            return _.find(state.project.environments, (environment) => {
                return environment.name === name
            });
        }
    }
});
