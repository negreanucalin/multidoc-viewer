app.service('environmentService',['$q','localStorageService', function ($q,localStorageService) {

    var self = this;

    this.getEnvironment = function(project) {
        var environment = null;
        if(project.hasEnvironmentList()){
            if(localStorageService.get('environment')){
                environment = new Environment(localStorageService.get('environment'));
            } else {//First run
                environment = self.getDefaultEnvironment(project);
                self.setEnvironment(environment);
            }
        }
        return environment;
    };

    this.setEnvironment = function(environment){
        localStorageService.set('environment', environment);
    };

    this.getDefaultEnvironment = function(project){
        return project.getEnvironment(0);
    };

}]);
