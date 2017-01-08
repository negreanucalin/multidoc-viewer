app.service('categoryFactory',['routeFactory', function (routeFactory) {

    this.buildListFromJson = function (routesJSON) {
        var categories = [];
        for(var i=0; i<routesJSON.length; i++) {
            var category = new Category();
            category.setId(routesJSON[i].id);
            category.setName(routesJSON[i].name);
            if(routesJSON[i].categoryList) {
                category.setCategoryList(this.buildListFromJson(routesJSON[i].categoryList));
            } else if(routesJSON[i].routes){
                var routeList = routeFactory.buildRouteListFromJson(routesJSON[i].routes, category);
                for(var j=0; j<routeList.length;j++) {
                    category.addRoute(routeList[j]);
                }
            }
            categories.push(category);
        }
        return categories;
    };


}]);
