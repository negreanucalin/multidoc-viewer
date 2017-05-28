
app.controller("RouteController", [
    '$scope','localStorageService','projectService','visualHelper','routeService','sandboxService','routeControllerHelper','tagService','$stateParams','$rootScope','$state',
    function ($scope,localStorageService,projectService,visualHelper,routeService,sandboxService,routeControllerHelper,tagService,$stateParams,$rootScope,$state) {

    $scope.files = [];
    $scope.sandboxFiles = [];
    $scope.sandboxOutput = {};
    /**
     *
     * @type {Route}
     */
    $scope.route = {};
    //For environment parsing we need to store the original
    $scope.originalRouteUrl = "";
    /**
     *
     * @type {Route}
     */
    $scope.sandboxRoute = {};
    //For environment parsing we need to store the original
    $scope.originalSandBoxRouteUrl = "";
    $scope.sandboxRouteUriList = [];
    $scope.sandboxRoutePostList = [];

    $scope.visualHelper = visualHelper;
    $scope.sandboxService = sandboxService;
    $scope.authorization = {};
    $scope.environment = {};
    $scope.tagList = tagService.getTagList();

    projectService.getProject().then(function(project) {
        $scope.environment = environmentService.getEnvironment(project);
        $scope.resetSandbox();
    });

    if(localStorageService.get('authorization')){
        //if the user has set authorization on a previous route
        $scope.authorization = localStorageService.get('authorization');
    }

    $scope.$on('authorizationChanged',function(event,authorization){
        $scope.authorization = authorization;
    });

    $scope.parseUrl = function(){
        $scope.route.getRequest().setUrl(
            sandboxService.parseEnvironment(
                $scope.originalRouteUrl,
                $scope.environment)
        );
        $scope.sandboxRoute.getRequest().setUrl(
            sandboxService.parseSandboxUrl(
                $scope.originalSandBoxRouteUrl,
                $scope.sandboxRouteUriList,
                $scope.environment
            )
        );
    };

    $scope.$on('environmentChanged',function(event,environment){
        $scope.environment = environment;
        $scope.parseUrl();
    });


    if($state.is('routeDetails') || $state.is('tagSearchRouteDetails')){
        routeService.getRouteById($stateParams.routeId).then(
            function(route) {
                $scope.route = route;
                if(localStorageService.get('environment')){
                    $scope.environment = new Environment(localStorageService.get('environment'));
                }
                $scope.resetSandbox();
            }, function (err){
                console.log('err', 'Route does not exist');
            }
        );
    }

    /**
     *
     * @param route
     */
    $scope.validateAuthorization = function(route){
        if(route.getRequest().needsAuthentication()){
            if(!angular.isDefined($scope.authorization.token) || $scope.authorization.token.length === 0){
                throw "Route needs authorization";
            }
        }
    };

    /**
     *
     * @param {Route} route
     * @param {Param[]} postParamList
     */
    $scope.runSandbox = function(route, postParamList) {
        try{
            $scope.validateAuthorization(route);
            sandboxService.callRoute(route, postParamList, $scope.sandboxFiles, $scope.authorization).then(function(reponse){
                $scope.sandboxOutput = reponse;
            });
        } catch(error) {
            alert(error);
        }
    };

    $scope.fileSelected = function (element, name) {
        $scope.files[name] = element.files[0];
    };
    $scope.fileSelectedSandbox = function (element, name) {
        $scope.sandboxFiles[name] = element.files[0];
    };

    $scope.checkDefaultValue = function(postParam) {
        if(!postParam.enabled && postParam.has_default) {
            postParam.value = postParam.default;
        }
    };

    $scope.resetSandbox = function() {
        $scope.sandboxOutput = {};
        $scope.sandboxRoute = angular.copy($scope.route);
        $scope.originalRouteUrl = $scope.route.getRequest().getUrl();
        $scope.originalSandBoxRouteUrl = $scope.sandboxRoute.getRequest().getUrl();
        var list = $scope.sandboxRoute.getRequest().getUriParameterList();
        $scope.sandboxRouteUriList = routeControllerHelper.convertUriParameterList(list);
        list = $scope.sandboxRoute.getRequest().getPostParameterList();
        $scope.sandboxRoutePostList = routeControllerHelper.convertPostParameterList(list);
        $scope.parseUrl();
    };

    /**
     *
     * @param {Tag} tag
     */
    $scope.tagIsAlreadyAdded = function(tag){
      for(var i=0; i<$scope.tagList.length; i++) {
          if($scope.tagList[i].getName() === tag.getName()) {
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

    /**
     *
     * @param {Param} parameter
     */
    $scope.getDownloadLink = function(parameter){
        return 'api_data/'+parameter.getExampleData();
    };
}]);
