import Vue from 'vue'
import Vuex from 'vuex'
import ProjectService from "../services/api/ProjectService";
import TagService from "../services/tagService";

Vue.use(Vuex);
let tagService = new TagService();
export const main = new Vuex.Store({
    state: {
        project: {},
        routeList: [],
        filteredRouteList: [],
        environment :'',
        isSandbox: false,
        tags:new Set([])
    },
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
        toggleSandbox() {
            main.commit('TOGGLE_SANDBOX');
        },
        toggleTag({ commit }, tag) {
            main.commit('TOGGLE_TAG', tag);
        },
        clearTagSearch({ commit }) {
            main.commit('CLEAR_TAGS');
        },
    },
    mutations: {
        SET_PROJECT(state, project) {
            state.project = project;
        },
        SET_ROUTES(state, routeList) {
            state.filteredRouteList = routeList;
            state.routeList = routeList;
        },
        SET_ENVIRONMENT(state, environment) {
            state.environment = environment;
        },
        TOGGLE_SANDBOX(state) {
            state.isSandbox = !state.isSandbox;
        },
        CLEAR_TAGS(state) {
            state.tags = new Set();
            state.filteredRouteList = state.routeList;
        },
        TOGGLE_TAG(state, tag) {
            let tags = new Set(Array.from(state.tags));
            if (tags.has(tag)) {
                tags.delete(tag);
            } else {
                tags.add(tag);
            }
            state.filteredRouteList = tagService.filterRoutesByTags(state.routeList, tags);
            state.tags = tags;
        },
    },
    getters: {
        isSandbox: state => ()=>{
            return state.isSandbox;
        },
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
