app.service('categoryService',['$q','$http','categoryFactory', function ($q,$http,categoryFactory) {

    this.getCategoryList = function () {
        var defer = $q.defer();
        $http({
            method : "GET",
            url : "api_data/categories.json"
        }).then(function mySucces(response) {
            defer.resolve(categoryFactory.buildListFromJson(response.data.categoryList));
        }, function myError(response) {
            defer.reject(response);
        });
        return defer.promise;
    };

}]);
