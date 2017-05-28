app.service('routeFactory', ['requestFactory','tagFactory','paramFactory','statusFactory',function (requestFactory, tagFactory,paramFactory,statusFactory) {

    this.buildRouteFromJson = function (routesJSON, category) {
        var route = new Route();
        route.setName(routesJSON.name);
        route.setDescription(routesJSON.description);
        route.setRequest(requestFactory.buildRequestFromJson(routesJSON.request));
        route.setId(routesJSON.id);
        if(routesJSON.tags){
            route.setHasTagList(true);
            route.setTagList(tagFactory.buildTagListFromJson(routesJSON.tags));
        }
        if(routesJSON.statusCodes){
            route.setStatusCodeList(statusFactory.buildListFromJson(routesJSON.statusCodes));
            route.setHasStatusCodes(true);
        }
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


    this.buildGUIRouteFromJson = function (routesJSON, category) {
        var route = new GUIRoute();
        route.setName(routesJSON.name);
        route.setDescription(routesJSON.description);
        route.setId(routesJSON.id);
        if(routesJSON.tags){
            route.setHasTagList(true);
            route.setTagList(tagFactory.buildTagListFromJson(routesJSON.tags));
        }
        route.setRequest(requestFactory.buildRequestFromJson(routesJSON.request));
        route.setCategory(category);
        return route;
    };


    this.buildGUIRouteListFromJson = function (routesJSON, category) {
        var list = [];
        for(var i=0; i<routesJSON.length; i++){
            list.push(this.buildGUIRouteFromJson(routesJSON[i],category));
        }
        return list;
    };
}]);
