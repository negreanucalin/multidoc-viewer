app.service('projectService',['$q','$http','projectFactory', function ($q,$http,projectFactory) {

    this.getEnvironmentByName = function(project,name){
        for(var i=0;i<project.getEnvironmentList().length;i++){
            if(project.getEnvironment(i).getName() === name){
                return project.getEnvironment(i);
            }
        }
    };


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
