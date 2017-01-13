app.service('routesService',['$q','$http','routesFactory', function ($q,$http,routesFactory) {

    this.getRouteList = function () {
        var defer = $q.defer();
        $http({
            method : "GET",
            url : "api_data/routes.json"
        }).then(function mySucces(response) {
            defer.resolve(routesFactory.buildListFromJson(response.data.category));
        }, function myError(response) {
            defer.reject(response);
        });
        return defer.promise;
    };

}]);
