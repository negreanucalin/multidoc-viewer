app.service('categoryFactory',['routeFactory', function (routeFactory) {

    this.buildListFromJson = function (routesJSON) {
        var categories = [];
        for(var i=0; i<routesJSON.length; i++) {
            var category = new Category();
            category.setId(routesJSON[i].id);
            category.setName(routesJSON[i].name);
            if(routesJSON[i].categoryList) {
                category.setCategoryList(this.buildListFromJson(routesJSON[i].categoryList));
                category.setHasCategoryList(true);
            } else if(routesJSON[i].routes){
                var routeList = routeFactory.buildRouteListFromJson(routesJSON[i].routes, category);
                category.setRouteList(routeList);
            }
            categories.push(category);
        }
        return categories;
    };

    this.buildNavigationListFromJson = function (routesJSON, level) {
        var categories = [];
        if(typeof level == 'undefined') {
            level = 0;
        }
        level+=1;
        for(var i=0; i<routesJSON.length; i++) {
            var category = new NavigationCategory();
            if(level == 1){
                category.setIsVisible(true);
            } else {
                category.setIsVisible(false);
            }
            category.setId(routesJSON[i].id);
            category.setName(routesJSON[i].name);
            if(routesJSON[i].categoryList) {
                category.setCategoryList(this.buildNavigationListFromJson(routesJSON[i].categoryList, level));
                category.setHasCategoryList(true);
            } else if(routesJSON[i].routes){
                var routeList = routeFactory.buildNavigationRouteListFromJson(routesJSON[i].routes, category);
                category.setRouteList(routeList);
            }
            categories.push(category);
        }
        return categories;
    };

}]);
