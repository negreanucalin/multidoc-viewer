app.service('routeFactory', ['tagFactory','paramFactory',function (tagFactory,paramFactory) {

    this.buildRouteFromJson = function (routesJSON,category) {
        var route = new Route();
        route.setName(routesJSON.name);
        route.setDescription(routesJSON.description);
        route.setUrl(routesJSON.url);
        route.setMethod(routesJSON.method.toUpperCase());
        route.setResponseType(routesJSON.response_type.toUpperCase());
        route.setId(routesJSON.id);
        if(routesJSON.tags){
            route.setTagList(tagFactory.buildTagListFromJson(routesJSON.tags));
        }
        route.setParameterList(paramFactory.buildParamListFromJson(routesJSON.params));
        route.setCategory(category);
        return route;
    };

    this.buildRouteListFromJson = function (routesJSON, category) {
        var list = [];
        for(var i=0; i<routesJSON.length; i++){
            list.push(this.buildRouteFromJson(routesJSON[i],category));
        }
        return list;
    };


    this.buildNavigationRouteFromJson = function (routesJSON,category) {
        var route = new NavigationRoute();
        route.setName(routesJSON.name);
        route.setDescription(routesJSON.description);
        route.setUrl(routesJSON.url);
        route.setMethod(routesJSON.method.toUpperCase());
        route.setResponseType(routesJSON.response_type.toUpperCase());
        route.setId(routesJSON.id);
        if(routesJSON.tags){
            route.setTagList(tagFactory.buildTagListFromJson(routesJSON.tags));
        }
        route.setParameterList(paramFactory.buildParamListFromJson(routesJSON.params));
        route.setCategory(category);
        return route;
    };


    this.buildNavigationRouteListFromJson = function (routesJSON, category) {
        var list = [];
        for(var i=0; i<routesJSON.length; i++){
            list.push(this.buildNavigationRouteFromJson(routesJSON[i],category));
        }
        return list;
    };
}]);
