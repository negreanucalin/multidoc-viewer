app.service('routeService',['$q','categoryService', function ($q,categoryService) {

    var self = this;

    this.findRouteInCategory = function(categoryList, routeId) {
        var route = null;
        for(var i=0; i<categoryList.length; i++){
            if(categoryList[i].hasRouteList()) {
                for(var j=0; j<categoryList[i].getRouteList().length;j++){
                    route = categoryList[i].getRoute(j);
                    if(route.getId() === parseInt(routeId)) {
                        return route;
                    }
                }
            }
        }
        for(i=0; i<categoryList.length; i++) {
            if(categoryList[i].hasCategoryList()){
                return this.findRouteInCategory(categoryList[i].getCategoryList(), routeId);
            }
        }
    };

    this.getRouteById = function (id) {
        var defer = $q.defer();
        categoryService.getCategoryList().then(
            function mySucces(categoryList) {
                defer.resolve(self.findRouteInCategory(categoryList,id));
        }, function myError(response) {
            defer.reject(response);
        });
        return defer.promise;
    };
}]);
