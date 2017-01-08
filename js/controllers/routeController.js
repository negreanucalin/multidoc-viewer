
app.controller("routeCtrl", ['$scope','visualHelper','routeService','sandboxService','$stateParams',
    function ($scope,visualHelper,routeService,sandboxService,$stateParams) {

    $scope.testSandboxOutput = {};
    $scope.sandboxOutput = {};
    /**
     *
     * @type {Route}
     */
    $scope.route = {};
    /**
     *
     * @type {Route}
     */
    $scope.sandboxRoute = {};
    $scope.sandboxRouteUriList = [];
    $scope.sandboxRoutePostList = [];

    $scope.visualHelper = visualHelper;
    $scope.sandboxService = sandboxService;

    routeService.getRouteById($stateParams.routeId).then(
        function(route) {
            $scope.route = route;
            $scope.resetSandbox();
        }
    );

    /**
     *
     * @param {Route} route
     */
    $scope.runExample = function(route) {
        var list = $scope.sandboxRoute.getPostParameterList();
        var sandboxRoutePostList = [];
        for(var i=0; i<list.length;i++){
            sandboxRoutePostList.push({
                "name":list[i].getName(),
                "value":list[i].getExampleData(),
                "required":!list[i].isOptional(),
                "enabled":true
            });
        }
        sandboxService.runExample(route,sandboxRoutePostList).then(function(reponse){
            if(route.getResponseType() == "JSON") {
                $scope.testSandboxOutput = reponse;
            }
        });
    };

    $scope.clearExample = function() {
        $scope.testSandboxOutput = {};
    };

    $scope.parseUrl = function(){
        $scope.sandboxRoute.setUrl(sandboxService.parseSandboxUrl($scope.route.getUrl(),$scope.sandboxRouteUriList));
    };

    $scope.checkDefaultValue = function(postParam) {
        if(!postParam.enabled && postParam.has_default) {
            postParam.value = postParam.default;
        }
    };

    /**
     *
     * @param {Route} route
     */
    $scope.runSandbox = function(route, postParamList) {
        sandboxService.runExample(route, postParamList).then(function(reponse){
            if(route.getResponseType() == "JSON") {
                $scope.sandboxOutput = reponse;
            }
        });
    };

    $scope.resetSandbox = function() {
        $scope.sandboxOutput = {};
        $scope.sandboxRouteUriList = [];
        $scope.sandboxRoutePostList = [];
        $scope.sandboxRoute = angular.copy($scope.route);
        var list = $scope.sandboxRoute.getUriParameterList();
        for(var i=0; i<list.length;i++){
            $scope.sandboxRouteUriList.push({
                "name":list[i].getName(),
                "value":list[i].getExampleData(),
                "required":!list[i].isOptional(),
                "enabled":true,
                "has_default":list[i].hasDefaultValue(),
                "default":list[i].getDefaultValue(),
                "hasListValues":list[i].hasPossibleValues(),
                "listValues":list[i].getPossibleValues()
            });
        }
        list = $scope.sandboxRoute.getPostParameterList();
        for(i=0; i<list.length;i++){
            $scope.sandboxRoutePostList.push({
                "name":list[i].getName(),
                "value":list[i].getExampleData(),
                "required":!list[i].isOptional(),
                "enabled":true,
                "has_default":list[i].hasDefaultValue(),
                "default":list[i].getDefaultValue(),
                "hasListValues":list[i].hasPossibleValues(),
                "listValues":list[i].getPossibleValues()
            });
        }
        $scope.parseUrl();
    }


}]);
