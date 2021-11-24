import Vue from 'vue'
import Vuex from 'vuex'
import ProjectService from "../services/api/ProjectService";
import TagService from "../services/tagService";

Vue.use(Vuex);
let tagService = new TagService();
export const main = new Vuex.Store({
    state: {
        // Show application after page loads
        isLoading: true,
        project: {},
        // Tree with routes/categories
        routeList: [],
        // Filtered route/category list
        filteredRouteList: [],
        // If we are in sandbox mode
        isSandbox: false,
        // Tags to filter routes
        tags: new Set([]),
        // Variable values object in case we have environments or variables
        variables: {}
    },
    actions: {
        async loadProject() {
            let project = await ProjectService.get();
            main.commit('SET_PROJECT', project);
            if (project.hasOwnProperty('variables')) {
                for(let variable of Object.keys(project.variables)) {
                    main.commit('SET_VARIABLE', {'key': variable, 'value': ''});
                    if (project.variables[variable].hasOwnProperty('values')) {
                        main.commit('SET_VARIABLE', {'key': variable, 'value': Object.keys(project.variables[variable].values)[0]});
                    }
                }
            }
            main.commit('SET_LOADING', false);
        },
        async loadRoutes() {
            let response = await ProjectService.getRoutes();
            main.commit('SET_ROUTES', response);
        },
        setVariable({commit}, payload) {
            main.commit('SET_VARIABLE', {'key': payload.name, 'value': payload.value});
        },
        toggleSandbox() {
            main.commit('TOGGLE_SANDBOX');
        },
        toggleTag({commit}, tag) {
            main.commit('TOGGLE_TAG', tag);
        },
        clearTagSearch() {
            main.commit('CLEAR_TAGS');
        }
    },
    mutations: {
        SET_LOADING(state, isLoading) {
            state.isLoading = isLoading;
        },
        SET_PROJECT(state, project) {
            state.project = project;
        },
        SET_ROUTES(state, routeList) {
            state.filteredRouteList = routeList;
            state.routeList = routeList;
        },
        SET_VARIABLE(state, payload) {
            let newState = {...state.variables};
            newState[payload.key] = payload.value;
            state.variables = newState;
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
        }
    },
    getters: {
        isSandbox: state => () => {
            return state.isSandbox;
        },
        getProject: state => () => {
            return state.project;
        },
        getRoutes: state => () => {
            return state.routeList;
        },
        hasVariables: state => () => {
            return state.project.hasOwnProperty('variables') &&
            Object.keys(state.project.variables).length > 0;
        },
        getVariables: (state) => () => {
            return Object.keys(state.variables);
        },
        getVariableKey: (state) => (name) => {
            if (state.variables[name]) {
                return state.variables[name];
            }
        },
        getVariableValues: (state) => (name) => {
            if (
                state.project.hasOwnProperty('variables') &&
                state.project.variables.hasOwnProperty(name)) {
                return Object.keys(state.project.variables[name].values);
            }
            return [];
        },
        getVariableValue: (state) => (name) => {
            if (state.variables[name]) {
                // Multiselect
                if (state.project.variables[name].hasOwnProperty('values')) {
                    return state.project.variables[name].values[state.variables[name]];
                }
                // Text
                return state.variables[name];
            }
            return '';
        },
        projectHasVariables: (state) => {
            return state.project.hasOwnProperty('variables');
        },
    }
});
