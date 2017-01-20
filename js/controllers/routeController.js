
app.controller("RouteController", ['$scope','visualHelper','routeService','sandboxService','routeControllerHelper','tagService','$stateParams','$rootScope','$state',
    function ($scope,visualHelper,routeService,sandboxService,routeControllerHelper,tagService,$stateParams,$rootScope,$state) {

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
    $scope.authorization = {};

    $scope.tagList = tagService.getTagList();

    $scope.$on('authorizationChanged',function(event,authorization){
        $scope.authorization = authorization;
    });

    if($state.is('routeDetails') || $state.is('tagSearchRouteDetails')){
        routeService.getRouteById($stateParams.routeId).then(
            function(route) {
                $scope.route = route;
                $scope.resetSandbox();
            }
        );
    }

    /**
     *
     * @param route
     */
    $scope.validateAuthorization = function(route){
        if(route.needsAuthentication()){
            if(!angular.isDefined($scope.authorization.token) || $scope.authorization.token.length == 0){
                throw "Route needs authorization";
            }
        }
    };

    /**
     *
     * @param {Route} route
     */
    $scope.runExample = function(route) {
        try {
            $scope.validateAuthorization(route);
            var list = $scope.sandboxRoute.getPostParameterList();
            var sandboxRoutePostList = routeControllerHelper.convertPostParameterList(list);
            sandboxService.runExample(route, sandboxRoutePostList, $scope.authorization).then(function (reponse) {
                if (route.getResponseType() == "JSON") {
                    $scope.testSandboxOutput = reponse;
                }
            });
        } catch(error) {
            alert(error);
        }
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
        try{
            $scope.validateAuthorization(route);
            sandboxService.runExample(route, postParamList, $scope.authorization).then(function(reponse){
                if(route.getResponseType() == "JSON") {
                    $scope.sandboxOutput = reponse;
                }
            });
        } catch(error) {
            alert(error);
        }
    };

    $scope.resetSandbox = function() {
        $scope.sandboxOutput = {};
        $scope.sandboxRoute = angular.copy($scope.route);
        var list = $scope.sandboxRoute.getUriParameterList();
        $scope.sandboxRouteUriList = routeControllerHelper.convertUriParameterList(list);
        list = $scope.sandboxRoute.getPostParameterList();
        $scope.sandboxRoutePostList = routeControllerHelper.convertPostParameterList(list);
        $scope.parseUrl();
    };

    /**
     *
     * @param {Tag} tag
     */
    $scope.tagIsAlreadyAdded = function(tag){
      for(var i=0; i<$scope.tagList.length; i++) {
          if($scope.tagList[i].getName() == tag.getName()) {
              return true;
          }
      }
        return false;
    };

    /**
     *
     * @param {Tag} tag
     */
    $scope.addTag = function(tag){
        if(!$scope.tagIsAlreadyAdded(tag)){
            $scope.tagList.push(tag);
            $rootScope.$broadcast('tagListChanged', $scope.tagList);
        }
    };


}]);
