
app.controller("HeaderController", ['$scope','projectService','routeService','$stateParams','$state','$rootScope','localStorageService',
    function ($scope,projectService,routeService,$stateParams,$state,$rootScope,localStorageService) {

    $scope.project = new Project();
    $scope.route = {};
    $scope.authorization = {header:'Authorization', token:''};
    $scope.environment = {};

    if(localStorageService.get('authorization')){
        //if the user has set authorization on a previous route
        $scope.authorization = localStorageService.get('authorization');
    }

    if(localStorageService.get('environment')){
        $scope.environment = new Environment(localStorageService.get('environment'));
    }

    projectService.getProject().then(function(project) {
        $scope.project = project;
        if(!$scope.environment){
            $scope.environment = projectService.getEnvironmentByName($scope.project, 'default');
        }
    });

    $scope.sendAuthorizationChange = function(){
        localStorageService.set('authorization', $scope.authorization);
        $rootScope.$broadcast('authorizationChanged', $scope.authorization);
    };

    $scope.sendEnvironmentChange = function(){
        localStorageService.set('environment', $scope.environment);
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
