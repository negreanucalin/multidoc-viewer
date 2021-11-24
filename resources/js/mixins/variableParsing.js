import {mapGetters} from "vuex";
let variableParsing = {

    methods: {
        parseVariable(url) {
            let variableName = url.match(/[^{{\}}]+(?=}})/g);
            if (!Array.isArray(variableName)) {
                return url;
            }
            variableName = variableName[0];
            let value = this.getVariableValue(variableName);
            if (value) {
                return url.replace("{{"+variableName+"}}", value);
            }
            return url;
        },
        parseVariablesAndFormat(route) {
            route.request.url = this.parseVariable(route.request.url);
            if (route.request.hasOwnProperty('headers')) {
                route.request.headers.forEach((header, index)=>{
                    route.request.headers[index].value = this.parseVariable(header.value);
                })
            }
            route.request.uriParams = this.getParametersByType(route.request.params,'uri');
            route.request.postParams = this.getParametersByType(route.request.params,'post');
            return route;
        },
        parseUrl(url, params) {
            params.forEach((uriParameter) => {
                url = url.replace("[/:"+uriParameter.name+"]","/"+uriParameter.example);
                url = url.replace("[:"+uriParameter.name+"]",uriParameter.example);
            });
            return url;
        },
        getParametersByType(routes, method)
        {
            let routeList = [];
            routes.forEach((route)=>{
                if (route.type === method)
                    routeList.push(route)
            });
            return routeList;
        }
    },
    computed: {
        ...mapGetters(['getVariableValue'])
    },
};
export { variableParsing };
