app.service('projectService',['$q','$http','projectFactory', function ($q,$http,projectFactory) {

    this.getProject = function () {
        var defer = $q.defer();
        $http({
            method : "GET",
            url : "api_data/project.json"
        }).then(function mySucces(response) {
            defer.resolve(projectFactory.buildFromJson(response.data));
        }, function myError(response) {
            defer.reject(response);
        });
        return defer.promise;
    };

}]);
