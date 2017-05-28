
app.controller("HeaderController", ['$scope','projectService','routeService','$stateParams','$state','$rootScope','localStorageService','environmentService',
    function ($scope,projectService,routeService,$stateParams,$state,$rootScope,localStorageService,environmentService) {

    $scope.project = new Project();
    $scope.route = {};
    $scope.authorization = {header:'Authorization', token:''};
    $scope.environment = {};

    if(localStorageService.get('authorization')){
        //if the user has set authorization on a previous route
        $scope.authorization = localStorageService.get('authorization');
    }

    projectService.getProject().then(function(project) {
        $scope.project = project;
        $scope.environment = environmentService.getEnvironment(project);
    });

    $scope.sendAuthorizationChange = function(){
        localStorageService.set('authorization', $scope.authorization);
        $rootScope.$broadcast('authorizationChanged', $scope.authorization);
    };

    $scope.sendEnvironmentChange = function(){
        environmentService.setEnvironment($scope.environment);
        $rootScope.$broadcast('environmentChanged', $scope.environment);
    };

    if($state.is('routeDetails')) {
        routeService.getRouteById($stateParams.routeId).then(
            function (route) {
                $scope.route = route;
            }
        );
    }
}]);
