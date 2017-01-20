
app.controller("HeaderController", ['$scope','projectService','routeService','$stateParams','$state','$rootScope','localStorageService',
    function ($scope,projectService,routeService,$stateParams,$state,$rootScope,localStorageService) {

    $scope.project = new Project();
    $scope.route = {};
    $scope.authorization = {header:'Authorization', token:''};

    if(localStorageService.get('authorization')){
        //if the user has set authorization on a previous route
        $scope.authorization = localStorageService.get('authorization');
    }

    projectService.getProject().then(function(project) {
        $scope.project = project;
    });

    $scope.sendAuthorizationChange = function(){
        localStorageService.set('authorization', $scope.authorization);
        $rootScope.$broadcast('authorizationChanged', $scope.authorization);
    };

    if($state.is('routeDetails')) {
        routeService.getRouteById($stateParams.routeId).then(
            function (route) {
                $scope.route = route;
            }
        );
    }
}]);
