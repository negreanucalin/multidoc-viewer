app.service('categoryFactory',['routeFactory', function (routeFactory) {

    this.buildListFromJson = function (routesJSON) {
        var categories = [];
        for(var i=0; i<routesJSON.length; i++) {
            var category = new Category();
            category.setId(routesJSON[i].id);
            category.setName(routesJSON[i].name);
            if(typeof routesJSON[i].needsAuthentication != "undefined"){
                category.setNeedsAuthentication(routesJSON[i].needsAuthentication);
            }
            if(routesJSON[i].categoryList) {
                category.setCategoryList(this.buildListFromJson(routesJSON[i].categoryList));
                category.setHasCategoryList(true);
            } else if(routesJSON[i].routes){
                category.setRouteList(routeFactory.buildRouteListFromJson(routesJSON[i].routes, category));
            }
            categories.push(category);
        }
        return categories;
    };

    this.buildNavigationListFromJson = function (routesJSON, parentIdList, level) {
        var categories = [];
        if(typeof level == 'undefined') {
            level = 0;
            parentIdList = [];
        }
        level+=1;
        for(var i=0; i<routesJSON.length; i++) {
            var category = new NavigationCategory();
            category.setId(routesJSON[i].id);
            category.setName(routesJSON[i].name);
            if(typeof routesJSON[i].needsAuthentication != "undefined"){
                category.setNeedsAuthentication(routesJSON[i].needsAuthentication);
            }
            if(level == 1){
                parentIdList = [category.getId()];
            } else {
                parentIdList.push(category.getId());
            }
            category.setParentIdList(angular.copy(parentIdList));
            if(routesJSON[i].categoryList) {
                category.setCategoryList(this.buildNavigationListFromJson(routesJSON[i].categoryList, parentIdList,level));
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
