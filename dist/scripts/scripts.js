"use strict";
var app = angular.module("multidoc", ['ui.router','jsonFormatter','LocalStorageModule','ui.bootstrap']);

app.config(function($stateProvider, $urlRouterProvider,$qProvider) {
      //$qProvider.errorOnUnhandledRejections(false);
      $stateProvider
		.state('projectDetails', {
            url: '/project',
            views: {
                'header':{
                    templateUrl: 'includes/top-navigation.html',
                    controller:'HeaderController'
                },
                'content': {
                    templateUrl: 'includes/project.html',
                    controller:'projectCtrl'
                },
                'navigation': {
                    templateUrl: 'includes/navigation.html',
                    controller: 'NavigationController'
                },
                'footer':{
                    templateUrl: 'includes/footer.html'
                }
            }
        })
          .state('routeDetails', {
              url: '/route/:routeId/parents/:parents',
              views: {
                  'header':{
                      templateUrl: 'includes/top-navigation.html',
                      controller:'HeaderController'
                  },
                  'content': {
                      templateUrl: 'includes/route.html',
                      controller:'RouteController'
                  },
                  'navigation': {
                      templateUrl: 'includes/navigation.html',
                      controller: 'NavigationController'
                  },
                  'footer':{
                      templateUrl: 'includes/footer.html',
                      controller: 'FooterController'
                  }
              }
          })
          .state('tagSearch', {
              url: '/search/tags/',
              views: {
                  'header':{
                      templateUrl: 'includes/top-navigation.html',
                      controller:'HeaderController'
                  },
                  'content': {
                       templateUrl: 'includes/blank.html',
                  },
                  'navigation': {
                      templateUrl: 'includes/navigation.html',
                      controller: 'NavigationController'
                  },
                  'footer':{
                      templateUrl: 'includes/footer.html',
                      controller: 'FooterController'
                  }
              }
          })
          .state('tagSearchRouteDetails', {
              url: '/search/tags/route/:routeId/parents/:parents',
              views: {
                  'header':{
                      templateUrl: 'includes/top-navigation.html',
                      controller:'HeaderController'
                  },
                  'content': {
                      templateUrl: 'includes/route.html',
                      controller:'RouteController'
                  },
                  'navigation': {
                      templateUrl: 'includes/navigation.html',
                      controller: 'NavigationController'
                  },
                  'footer':{
                      templateUrl: 'includes/footer.html',
                      controller: 'FooterController'
                  }
              }
          })
          .state('missingConfig', {
              url: '/error/config',
              views: {
                  'content': {
                      templateUrl: 'includes/error.html'
                  }
              }
          })
      ;
	  $urlRouterProvider.otherwise('/project');
    }
);

app.filter("trust", ['$sce', function($sce) {
    return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
    }
}]);
String.prototype.hashCode = function(){
    var hash = 0;
    if (this.length == 0) return hash;
    for (i = 0; i < this.length; i++) {
        char = this.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

app.controller("FooterController", ['$scope','$rootScope','tagService','stateService',
    function ($scope,$rootScope,tagService,stateService) {

        $scope.tagList = tagService.getTagList();

        $scope.$on('tagListChanged',function(event,tagList){
            $scope.tagList = tagList;
            tagService.saveTagList($scope.tagList);
        });

        $scope.removeTag = function(tag){
            $scope.tagList.splice($scope.tagList.indexOf(tag), 1);
            tagService.saveTagList($scope.tagList);
            $rootScope.$broadcast('tagListChanged',$scope.tagList);
            if($scope.tagList.length == 0){
                $rootScope.$broadcast('goToProjectDetails',true);
            }
        };

        $scope.runTagSearch = function(){
            $rootScope.$broadcast('runTagSearch');
            if(stateService.is('routeDetails')){
                stateService.saveCurrentState();
            }
        };

        $scope.clearTagSearch = function(){
            tagService.saveTagList([]);
            $scope.tagList = [];
            if(!stateService.is('routeDetails')){
                stateService.loadLastState();
            }
        };


    }]);


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


app.controller("NavigationController", ['$scope','categoryService','visualHelper','$state','$stateParams','tagService',
    function ($scope,categoryService,visualHelper,$state,$stateParams,tagService) {

    $scope.visualHelper = visualHelper;
    $scope.categoryList = [];
    $scope.selectedMenu = "";
    $scope.tagList = tagService.getTagList();
    $scope.isSearchResult = false;


    $scope.getParentListFromState = function(){
        var activeParentList = $stateParams.parents.split("$");
        return activeParentList.map(function (x) {
            return parseInt(x, 10);
        });
    };

    if($state.is('projectDetails')) {
        $scope.selectedMenu = 'project_details';
        categoryService.getGUICategoryList([]).then(
            function(categoryList) {
                $scope.categoryList = categoryList;
            }
        );
    }
    if($state.is('routeDetails')) {
        var activeParentList = $scope.getParentListFromState();
        categoryService.getGUICategoryList(activeParentList).then(
            function(categoryList) {
                $scope.categoryList = categoryList;
            }
        );
        $scope.selectedMenu = $stateParams.routeId;
    }
    if($state.is('tagSearch')){
        $scope.isSearchResult = true;
        categoryService.getGUICategoryListByTagList($scope.tagList).then(
            function(categoryList) {
                $scope.categoryList = categoryList;
            }
        );
    }
    if($state.is('tagSearchRouteDetails')){
        $scope.isSearchResult = true;
        var activeParentList = $scope.getParentListFromState();
        categoryService.getGUICategoryListByTagList($scope.tagList,activeParentList).then(
            function(categoryList) {
                $scope.categoryList = categoryList;

            }
        );
        $scope.selectedMenu = $stateParams.routeId;
    }

    $scope.$on('tagListChanged',function(event,tagList){
        $scope.tagList = tagList;
    });

    $scope.$on('runTagSearch',function(){
        $state.go('tagSearch');
    });

    $scope.$on('goToProjectDetails',function(){
        $state.go('projectDetails');
    });

    /**
     *
     * @param {GUICategory} category
     */
    $scope.toggleVisibility = function(category){
        if(category.hasRouteList()){
            for(i=0; i<category.getRouteListCount(); i++){
                var route = category.getRoute(i);
                route.setIsVisible(!route.isVisible());
            }
        }
        if(category.hasCategoryList()){
            for(var i=0; i<category.getCategoryListCount(); i++){
                var subCategory = category.getCategory(i);
                subCategory.setIsVisible(!subCategory.isVisible());
            }
        }
    }

}]);


app.controller("projectCtrl", ['$scope','projectService','$state',function ($scope,projectService,$state) {

	$scope.project = new Project();

	projectService.getProject().then(function(project) {
		$scope.project = project;
	}, function(error){
        $state.go('missingConfig');
	});


}]);


app.controller("RouteController", [
    '$scope','environmentService','localStorageService','projectService','visualHelper','routeService','sandboxService','routeControllerHelper','tagService','$stateParams','$rootScope','$state',
    function ($scope,environmentService,localStorageService,projectService,visualHelper,routeService,sandboxService,routeControllerHelper,tagService,$stateParams,$rootScope,$state) {

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
            sandboxService.callRoute(route, postParamList, $scope.sandboxFiles, $scope.authorization).then(
                function(reponse){
                    $scope.sandboxOutput = reponse;
                },
                function (errorResponse){
                    console.log('errorResponse',errorResponse);
                    $scope.sandboxOutput = errorResponse;
                }
            );
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

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attributes) {
            element.bind('change', function () {
                $parse(attributes.fileModel)
                    .assign(scope,element[0].files)
                scope.$apply()
            });
        }
    };
}]);
app.service('categoryFactory',['routeFactory', function (routeFactory) {

    this.buildListFromJson = function (routesJSON) {
        var categories = [];
        for(var i=0; i<routesJSON.length; i++) {
            var category = new Category();
            category.setId(routesJSON[i].id);
            category.setName(routesJSON[i].name);
            if(typeof routesJSON[i].needsAuthentication !== "undefined"){
                category.setNeedsAuthentication(routesJSON[i].needsAuthentication);
            }
            if(routesJSON[i].routes){
                category.setHasRouteList(true);
                category.setRouteList(routeFactory.buildRouteListFromJson(routesJSON[i].routes, category));
            }
            if(routesJSON[i].categoryList) {
                category.setHasCategoryList(true);
                category.setCategoryList(this.buildListFromJson(routesJSON[i].categoryList));
            }
            categories.push(category);
        }
        return categories;
    };

    this.buildNavigationListFromJson = function (routesJSON, parentIdList, level) {
        var categories = [];
        if(typeof level === 'undefined') {
            level = 0;
            parentIdList = [];
        }
        level+=1;
        for(var i=0; i<routesJSON.length; i++) {
            var category = new GUICategory();
            category.setId(routesJSON[i].id);
            category.setName(routesJSON[i].name);
            if(typeof routesJSON[i].needsAuthentication !== "undefined"){
                category.setNeedsAuthentication(routesJSON[i].needsAuthentication);
            }
            if(level === 1){
                parentIdList = [category.getId()];
            } else {
                parentIdList.push(category.getId());
            }
            category.setParentIdList(angular.copy(parentIdList));
            if(routesJSON[i].routes){
                var routeList = routeFactory.buildGUIRouteListFromJson(routesJSON[i].routes, category);
                category.setHasRouteList(true);
                category.setRouteList(routeList);
            }
            if(routesJSON[i].categoryList) {
                category.setHasCategoryList(true);
                category.setCategoryList(this.buildNavigationListFromJson(routesJSON[i].categoryList, parentIdList, level));
            }
            categories.push(category);
        }
        return categories;
    };

}]);

app.service('headerFactory', function () {

    this.buildHeaderFromJson = function (headerJson) {
        var header = new Header();
        header.setName(headerJson.name);
        header.setValue(headerJson.value);
        return header;
    };

    this.buildHeaderListFromJson = function (headersJson) {
        var list = [];
        for(var i=0; i<headersJson.length; i++){
            list.push(this.buildHeaderFromJson(headersJson[i]));
        }
        return list;
    };

});

app.service('paramFactory', function () {

    this.buildParamFromJson = function (request, paramJSON) {
        var param = new Param();
        param.setDescription(paramJSON.description);
        param.setType(paramJSON.type);
        param.setIsOptional(paramJSON.isOptional);
        param.setDataType(paramJSON.data_type);
        if(paramJSON.data_type === 'file') {
            param.setIsFile(true);
            if(request){ //not when navigation (menu)
                request.setHasFileParameter(true);
            }
        }
        param.setExampleData(paramJSON.example);
        if(paramJSON.default){
            param.setHasDefaultValue(true);
            param.setDefaultValue(paramJSON.default);
        }
        if(paramJSON.listOption){
            param.setHasPossibleValues(true);
            param.setPossibleValues(paramJSON.listOption);
        }
        if(paramJSON.data_type === 'json'){
            param.setIsJsonParam(true);
            if(paramJSON.name){
                param.setName(paramJSON.name);
                param.setHasName(true);
            }
        } else {
            param.setName(paramJSON.name);
        }
        return param;
    };

    /**
     *
     * @param request
     * @param paramsJSON
     * @returns {Array}
     */
    this.buildParamListFromJson = function (request, paramsJSON) {
        var list = [];
        for(var i=0; i<paramsJSON.length; i++){
            list.push(this.buildParamFromJson(request, paramsJSON[i]));
        }
        return list;
    };

});

app.service('projectFactory', function () {

    this.buildEnvironment = function(envListJson){
        var env = new Environment();
        env.setUrl(envListJson.url);
        env.setName(envListJson.name);
        return env;
    };


    this.buildEnvironmentList = function(envListJson){
        var list = [];
        for(var i=0; i<envListJson.length;i++){
            list.push(this.buildEnvironment(envListJson[i]));
        }
        return list;
    };


    this.buildFromJson = function (projectJson) {
        var project = new Project();
        project.setName(projectJson.name);
        project.setDescription(projectJson.description);
        project.setVersion(projectJson.version);
        project.setBuildDate(projectJson.buildDate);
        if(projectJson.logo) {
            project.setLogo(projectJson.logo);
            project.setHasLogo(true);
        }
        if(projectJson.environments) {
            project.setHasEnvironmentList(true);
            project.setEnvironmentList(this.buildEnvironmentList(projectJson.environments));
        }
        return project;
    };

});

app.service('requestFactory', ['paramFactory','headerFactory',function (paramFactory, headerFactory) {

    /**
     *
     * @returns {Request}
     */
    this.buildRequestFromJson = function (requestJSON) {
        var request = new Request();
        request.setUrl(requestJSON.url);
        request.setMethod(requestJSON.method.toUpperCase());
        if(typeof requestJSON.needsAuthentication !== "undefined"){
            request.setNeedsAuthentication(requestJSON.needsAuthentication);
        }
        if(requestJSON.params) {
            request.setParameterList(paramFactory.buildParamListFromJson(request, requestJSON.params));
        }
        if(requestJSON.headers) {
            request.setHasHeaders(true);
            request.setHeaders(headerFactory.buildHeaderListFromJson(requestJSON.headers));
        }
        return request;
    };

}]);

app.service('responseFactory', [ 'headerFactory', function (headerFactory) {

    this.buildFromRequestResponse = function (response) {
        var responseObj = new Response();
        responseObj.setCode(response.code);
        responseObj.setText(response.text.trim());
        if(response.headers) {
            responseObj.setHasHeaders(true);
            responseObj.setHeaders(headerFactory.buildHeaderListFromJson(response.headers));
        }
        return responseObj;
    };

}]);

app.service('routeFactory', ['requestFactory','responseFactory','tagFactory','paramFactory','statusFactory',function (requestFactory, responseFactory, tagFactory,paramFactory,statusFactory) {

    this.buildRouteFromJson = function (routesJSON, category) {
        var route = new Route();
        route.setName(routesJSON.name);
        route.setDescription(routesJSON.description);
        route.setRequest(requestFactory.buildRequestFromJson(routesJSON.request));
        if(routesJSON.response){
            route.setHasResponse(true);
            route.setResponse(responseFactory.buildFromRequestResponse(routesJSON.response));
        }
        route.setId(routesJSON.id);
        if(routesJSON.tags){
            route.setHasTagList(true);
            route.setTagList(tagFactory.buildTagListFromJson(routesJSON.tags));
        }
        if(routesJSON.statusCodes){
            route.setStatusCodeList(statusFactory.buildListFromJson(routesJSON.statusCodes));
            route.setHasStatusCodes(true);
        }
        route.setCategory(category);
        return route;
    };

    this.buildRouteListFromJson = function (routesJSON, category) {
        var list = [];
        for(var i=0; i<routesJSON.length; i++){
            list.push(this.buildRouteFromJson(routesJSON[i],category));
        }
        return list;
    };


    this.buildGUIRouteFromJson = function (routesJSON, category) {
        var route = new GUIRoute();
        route.setName(routesJSON.name);
        route.setDescription(routesJSON.description);
        route.setId(routesJSON.id);
        if(routesJSON.tags){
            route.setHasTagList(true);
            route.setTagList(tagFactory.buildTagListFromJson(routesJSON.tags));
        }
        route.setRequest(requestFactory.buildRequestFromJson(routesJSON.request));
        route.setCategory(category);
        return route;
    };


    this.buildGUIRouteListFromJson = function (routesJSON, category) {
        var list = [];
        for(var i=0; i<routesJSON.length; i++){
            list.push(this.buildGUIRouteFromJson(routesJSON[i],category));
        }
        return list;
    };
}]);

app.service('statusFactory', function () {

    this.buildListFromJson = function (statusJSON) {
        var statusList = [];
        statusJSON.sort(function(a, b) {
            return parseInt(a.code) - parseInt(b.code);
        });
        for(var i=0; i<statusJSON.length; i++) {
            var status = new Status();
            status.setCode(statusJSON[i].code);
            status.setMessage(statusJSON[i].message);
            status.setDescription(statusJSON[i].description);
            statusList.push(status);
        }
        return statusList;
    };


});

app.service('tagFactory', function () {

    this.buildTagFromJson = function (tagJSON) {
        var tag = new Tag();
        tag.setName(tagJSON);
        return tag;
    };

    this.buildTagListFromJson = function (tagsJSON) {
        var list = [];
        for(var i=0; i<tagsJSON.length; i++){
            list.push(this.buildTagFromJson(tagsJSON[i]));
        }
        return list;
    };

});

app.service('routeControllerHelper', function () {

    /**
     *
     * @param {Param[]} list
     */
    this.convertUriParameterList = function (list) {
        var paramList = [];
        for(var i=0; i<list.length;i++){
            paramList.push({
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
        return paramList;
    };

    /**
     *
     * @param {Param[]} list
     */
    this.convertPostParameterList = function (list) {
        var paramList = [];
        for(var i=0; i<list.length;i++){
            paramList.push({
                "name":list[i].getName(),
                "value":list[i].getExampleData(),
                "required":!list[i].isOptional(),
                "enabled":true,
                "has_default":list[i].hasDefaultValue(),
                "default":list[i].getDefaultValue(),
                "hasListValues":list[i].hasPossibleValues(),
                "listValues":list[i].getPossibleValues(),
                //Json type param
                "isJson":list[i].isJsonParam(),
                "isFile":list[i].isFile(),
                "hasName":list[i].hasName()
            });
        }
        return paramList;
    };





});


app.factory(
    "transformRequestAsFormPost",
    function() {
        function transformRequest( data, getHeaders ) {
            var headers = getHeaders();
            headers[ "Content-type" ] = "application/x-www-form-urlencoded; charset=utf-8";
            return( serializeData( data ) );
        }
        return( transformRequest );

        function serializeData( data ) {
            // If this is not an object, defer to native stringification.
            if ( ! angular.isObject( data ) ) {
                return( ( data == null ) ? "" : data.toString() );
            }
            var buffer = [];
            // Serialize each key in the object.
            for ( var name in data ) {
                if ( ! data.hasOwnProperty( name ) ) {
                    continue;
                }
                var value = data[ name ];
                buffer.push(
                    encodeURIComponent( name ) +
                    "=" +
                    encodeURIComponent( ( value == null ) ? "" : value )
                );
            }
            // Serialize the buffer and clean it up for transportation.
            var source = buffer
                .join( "&" )
                .replace( /%20/g, "+" )
                ;
            return( source );
        }
    }
);
app.value(
    "$sanitize",
    function( html ) {
        return( html );
    }
);

app.service('visualHelper', function () {

    this.getMethodColorByRoute = function (route) {
        if( route instanceof Route || route instanceof GUIRoute) {
            switch(route.getRequest().getMethod()) {
                case 'GET':
                    return 'primary';
                    break;
                case 'PUT':
                    return 'info';
                    break;
                case 'POST':
                    return 'success';
                    break;
                case 'PATCH':
                    return 'warning';
                    break;
                case 'DELETE':
                    return 'danger';
                    break;
                default:
                    return 'default';
                    break;
            }
        }
    };

    /**
     *
     * @param {GUICategory} category
     * @returns {boolean}
     */
    this.isAtLeastOneRouteVisible = function(category)
    {
        for(var i=0; i<category.getRouteList().length;i++){
            if(category.getRoute(i).isVisible()){
                return true;
            }
        }
        return false;
    }

});


var Category = function() {

    this.id = "";
    this.name = "";
    this.routeList = [];
    this.categoryList = [];
    this.has_category_list = false;
    this.needs_authentication = false;
    this.has_route_list=false;

    this.setId = function(id){
        this.id = id;
        return this;
    };

    this.getId = function(){
        return this.id ;
    };

    this.addRoute = function(route){
        this.routeList.push(route);
        return this;
    };

    this.setRouteList = function(list){
        this.routeList = list;
        return this;
    };

    this.getRouteList = function(){
        return this.routeList ;
    };

    this.getRoute = function(index){
        return this.routeList[index] ;
    };

    this.setHasRouteList = function(hasRoutes){
        return this.has_route_list = hasRoutes;
    };

    this.hasRouteList = function(){
        return this.has_route_list;
    };

    this.setCategoryList = function(categoryList){
        this.categoryList = categoryList;
        return this;
    };

    this.addCategory = function(category){
        this.categoryList.push(category);
        return this;
    };

    this.getCategoryList = function(){
        return this.categoryList ;
    };

    this.getCategoryListCount = function(){
        return this.categoryList.length ;
    };

    this.getRouteListCount = function(){
        return this.routeList.length ;
    };


    this.hasCategoryList = function(){
        return this.has_category_list;
    };

    this.setHasCategoryList = function(hasCatlist){
        this.has_category_list = hasCatlist;
        return this;
    };

    this.setName = function(name){
        this.name = name;
        return this;
    };

    this.getName = function(){
        return this.name ;
    };

    this.setNeedsAuthentication = function(isNeeded){
        this.needs_authentication = isNeeded;
        return this;
    };

    this.needsAuthentication = function(){
        return this.needs_authentication ;
    };
};





var Environment = function() {

    this.name = "";
    this.url = "";

    this.setName = function(name){
        this.name = name;
        return this;
    };

    this.getName = function(){
        return this.name ;
    };


    this.setUrl = function(url){
        this.url = url;
        return this;
    };

    this.getUrl = function(){
        return this.url ;
    };

    var me = this,
        p = arguments[0];
    //constructor;
    p && environment();
    function environment(){
        for(var prop in p){
            //for safety you can use the hasOwnProperty function
            me[prop] = p[prop];
        }
    }
};
var Header = function() {

    this.name = null;

    this.value = null;

    this.setName = function(name){
        this.name = name;
        return this;
    };

    this.getName = function(){
        return this.name ;
    };

    this.setValue = function(value){
        this.value = value;
        return this;
    };

    this.getValue = function(){
        return this.value ;
    };
};





var Param = function() {

    this.name = "";
    this.description = "";
    this.type="";
    this.is_optional = false;
    this.data_type = "string";
    this.example_data = "";
    this.defaultValue = "";
    this.has_default_value = false;
    this.possibleValueList = [];
    this.hasPossibleValueList = false;
    this.isJson = false;
    this.isFileUpload = false;
    this.thisParamHasName = false;

    this.setName = function(name){
        this.name = name;
        return this;
    };

    this.getName = function(){
        return this.name ;
    };

    this.setDescription = function(desc){
        this.description = desc;
        return this;
    };

    this.getDescription = function(){
        return this.description ;
    };

    this.setType = function(type){
        this.type = type;
        return this;
    };

    this.getType = function(){
        return this.type ;
    };

    this.setIsOptional = function(isOpt){
        this.is_optional = isOpt;
        return this;
    };

    this.isOptional = function(){
        return this.is_optional;
    };

    this.setDataType = function(data){
        this.data_type = data;
        return this;
    };

    this.getDataType = function(){
        return this.data_type;
    };

    this.setExampleData = function(data){
        this.example_data = data;
        return this;
    };

    this.getExampleData = function(){
        return this.example_data;
    };

    this.setDefaultValue = function(value){
        this.defaultValue = value;
        return this;
    };

    this.getDefaultValue = function(){
        return this.defaultValue;
    };

    this.setHasDefaultValue = function(value){
        this.has_default_value = value;
        return this;
    };

    this.hasDefaultValue = function(){
        return this.has_default_value;
    };

    this.setPossibleValues = function(values){
        this.possibleValueList = values;
        return this;
    };

    this.getPossibleValues = function(){
        return this.possibleValueList;
    };

    this.hasPossibleValues = function(){
        return this.hasPossibleValueList;
    };

    this.setHasPossibleValues = function(has){
        this.hasPossibleValueList = has;
        return this;
    };

    this.setIsJsonParam = function(isJson){
        this.isJson = isJson;
        return this;
    };

    this.isJsonParam = function(){
        return this.isJson;
    };

    this.setIsFile = function(isFile){
        this.isFileUpload = isFile;
        return this;
    };

    this.isFile = function(){
        return this.isFileUpload;
    };

    this.setHasName = function(hasName){
        this.thisParamHasName = hasName;
        return this;
    };

    this.hasName = function(hasName){
        return this.thisParamHasName;
    };
};
var Project = function() {

    this.name = "";
    this.description = "";
    this.version = 0;
    this.has_environments = false;
    this.environmentList = [];
    this.has_logo = false;
    this.logo = "";

    this.setName = function(name){
        this.name = name;
        return this;
    };

    this.getName = function(){
        return this.name ;
    };

    this.setEnvironmentList = function(envList){
        this.environmentList = envList;
        return this;
    };

    this.addEnvironment = function(env){
        this.environmentList.push(env);
    };

    this.getEnvironmentList = function(){
        return this.environmentList;
    };

    this.getEnvironment = function(i){
        return this.environmentList[i];
    };

    this.setHasEnvironmentList = function(hasEnv){
        this.has_environments = hasEnv;
        return this;
    };

    this.hasEnvironmentList = function(){
        return this.has_environments;
    };

    this.setLogo = function(logo){
        this.logo = logo;
        return this;
    };

    this.getLogo = function(){
        return this.logo ;
    };


    this.setHasLogo = function(haslogo){
        this.has_logo = haslogo;
        return this;
    };

    this.hasLogo = function(){
        return this.has_logo;
    };

    this.setBuildDate = function(bd){
        this.buildDate = bd;
        return this;
    };

    this.getBuildDate = function(){
        return this.buildDate;
    };

    this.setVersion = function(ver){
        this.version = ver;
        return this;
    };

    this.getVersion = function(){
        return this.version;
    };

    this.setDescription = function(desc){
        this.description = desc;
        return this;
    };

    this.getDescription = function(){
        return this.description ;
    };

};





var Request = function() {

    this.method = "";
    this.url = "";
    this.needs_authentication = false;
    this.parameterList = [];
    this.headerList = [];
    this.has_file_parameter=false;
    this.has_headers=false;

    this.setHasHeaders = function(hasHeaders){
        this.has_headers = hasHeaders;
        return this;
    };

    this.hasHeaders = function(){
        return this.has_headers ;
    };

    this.setUrl = function(url){
        this.url = url;
        return this;
    };

    this.getUrl = function(){
        return this.url ;
    };

    this.setHeaders = function(headers){
        this.headerList = headers;
        return this;
    };

    this.getHeaders = function(){
        return this.headerList ;
    };

    this.setMethod = function(method){
        this.method = method;
        return this;
    };

    this.getMethod = function(){
        return this.method ;
    };

    this.setNeedsAuthentication = function(isNeeded){
        this.needs_authentication = isNeeded;
        return this;
    };

    this.needsAuthentication = function(){
        return this.needs_authentication ;
    };

    /**
     *
     * @returns {Param[]}
     */
    this.getUriParameterList = function(){
        var list = [];
        for(var i=0; i<this.parameterList.length;i++){
            if(this.parameterList[i].getType() === "uri") {
                list.push(this.parameterList[i]);
            }
        }
        return list;
    };

    this.getPostParameterList = function(){
        var list = [];
        for(var i=0; i<this.parameterList.length;i++){
            if(this.parameterList[i].getType() === "post") {
                list.push(this.parameterList[i]);
            }
        }
        return list;
    };

    this.hasPostParameterList = function(){
        for(var i=0; i<this.parameterList.length;i++){
            if(this.parameterList[i].getType() === "post") {
                return true;
            }
        }
        return false;
    };

    this.hasUriParameterList = function(){
        for(var i=0; i<this.parameterList.length;i++){
            if(this.parameterList[i].getType() === "uri") {
                return true;
            }
        }
        return false;
    };

    this.getParameterList = function(){
        return this.parameterList;
    };

    this.setParameterList = function(parameterList){
        return this.parameterList = parameterList;
    };

    this.hasParameters = function(){
        return this.parameterList.length >0;
    };

    this.setHasFileParameter = function(hasFile){
        this.has_file_parameter = hasFile;
        return this;
    };

    this.hasFileParameter = function(){
        return this.has_file_parameter ;
    };

};
var Response = function() {

    this.code = null;
    this.text = null;
    this.headerList = [];
    this.has_headers=false;


    this.setHasHeaders = function(hasHeaders){
        this.has_headers = hasHeaders;
        return this;
    };

    this.hasHeaders = function(){
        return this.has_headers ;
    };

    this.setCode = function(code){
        this.code = code;
        return this;
    };

    this.getCode = function(){
        return this.code ;
    };

    this.setText = function(text){
        this.text = text;
        return this;
    };

    this.getText = function(){
        return this.text;
    };

    this.setHeaders = function(headers){
        this.headerList = headers;
    };

    this.getHeaders = function(){
        return this.headerList;
    };
};



var Route = function() {

    this.id = "";
    this.name = "";
    this.description = "";
    this.tagList = [];
    this.category = {};
    this.response = {};
    this.request=null;
    this.statusCodeList = [];
    this.has_status_codes = false;
    this.has_tag_list = false;
    this.has_response=false;

    this.setId = function(id){
        this.id = id;
        return this;
    };

    this.getId = function(){
        return this.id ;
    };

    this.setResponse = function(Response){
        this.response = Response;
    };

    this.getResponse = function(){
        return this.response ;
    };

    this.setHasResponse = function(hasResponse){
        this.has_response = hasResponse;
    };

    this.hasResponse = function(){
        return this.has_response ;
    };


    this.setRequest = function(request){
        this.request = request;
        return this;
    };

    this.getRequest = function(){
        return this.request ;
    };

    this.setName = function(name){
        this.name = name;
        return this;
    };

    this.getName = function(){
        return this.name ;
    };

    this.setDescription = function(desc){
        this.description = desc;
        return this;
    };

    this.getDescription = function(){
        return this.description ;
    };

    this.setCategory = function(category){
        this.category = category;
        return this;
    };

    this.getCategory = function(){
        return this.category ;
    };

    this.addTag = function(tag){
        return this.tagList.push(tag);
    };

    this.getTagList = function(){
        return this.tagList;
    };

    this.getTag = function(i){
        return this.tagList[i];
    };

    this.setTagList = function(tagList){
        return this.tagList = tagList;
    };


    this.setHasTagList = function(hasTags){
        this.has_tag_list = hasTags;
    };

    this.hasTagList = function(){
        return this.has_tag_list ;
    };

    this.setHasStatusCodes = function(hasCodes){
        this.has_status_codes = hasCodes;
        return this;
    };

    this.hasStatusCodes = function(){
        return this.has_status_codes ;
    };

    this.setStatusCodeList = function(statusCodes){
        this.statusCodeList = statusCodes;
        return this;
    };

    this.getStatusCodeList = function(){
        return this.statusCodeList ;
    };
};





var Status = function() {

    this.code = null;
    this.description = null;
    this.message = null;

    this.setCode = function(code){
        this.code = code;
        return this;
    };

    this.getCode = function(){
        return this.code ;
    };

    this.setDescription = function(description){
        this.description = description;
        return this;
    };

    this.getDescription = function(){
        return this.description ;
    };

    this.setMessage = function(message){
        this.message = message;
        return this;
    };

    this.getMessage = function(){
        return this.message ;
    };

};



var Tag = function() {

    this.name = "";

    this.setName = function(name){
        this.name = name;
        return this;
    };

    this.getName = function(){
        return this.name ;
    };

    var me = this,
        p = arguments[0];
    //constructor;
    p && tag();
    function tag(){
        for(var prop in p){
            //for safety you can use the hasOwnProperty function
            me[prop] = p[prop];
        }
    }

};





app.service('categoryService',['$q','$http','categoryFactory', function ($q,$http,categoryFactory) {

    var self = this;

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

    this.markVisibleForNavigation = function(categoryList,visibleCategoryList,level,parentIdList){
        if(typeof level === 'undefined') {
            level = 0;
            parentIdList = [];
        }
        level+=1;
        for(var i=0; i<categoryList.length; i++) {
            var category = categoryList[i];
            var showChildren = false;
            if (level === 1) {
                category.setIsVisible(true);
                category.setIsParent(false);
                parentIdList = [category.getId()];
                if (visibleCategoryList.length > 0 && (visibleCategoryList.indexOf(category.getId()) !== -1)) {
                    showChildren = true;
                }
            } else {
                category.setIsParent(true);
                parentIdList.push(category.getId());
                if (visibleCategoryList.indexOf(category.getId()) !== -1) {
                    category.setIsVisible(true);
                    showChildren = true;
                } else {
                    category.setIsVisible(false);
                    showChildren = false;
                }
            }
            if(category.hasCategoryList()){
                this.markVisibleForNavigation(category.getCategoryList(),visibleCategoryList,level,parentIdList);
            }
            if(showChildren){
                category.getRouteList().map(function (route) {
                    route.setIsVisible(showChildren);
                    return route;
                });
                category.getCategoryList().map(function (category) {
                    category.setIsVisible(showChildren);
                    return category;
                });
            }
        }
    };

    this.markVisibleForSearch = function(categoryList){
        for(var i=0; i<categoryList.length; i++) {
            var category = categoryList[i];
            category.setIsVisible(true);
            category.getRouteList().map(function (route) {
                route.setIsVisible(true);
                return route;
            });
            if(category.hasCategoryList()){
                this.markVisibleForSearch(category.getCategoryList());
            }
        }
    };

    this.getGUICategoryList = function (visibleCategoryList) {
        var defer = $q.defer();
        $http({
            method : "GET",
            url : "api_data/categories.json"
        }).then(function mySucces(response) {
            try{
                var categoryList = categoryFactory.buildNavigationListFromJson(response.data.categoryList, visibleCategoryList);
                self.markVisibleForNavigation(categoryList, visibleCategoryList);
                defer.resolve(categoryList);
            } catch (err){
                console.log(err);
            }

        }, function myError(response) {
            defer.reject(response);
        });
        return defer.promise;
    };

    this.routeHasTag = function(route,tag){
        for(var i=0; i<route.getTagList().length; i++){
            if(route.getTag(i).getName() === tag.getName()){
                return true;
            }
        }
        return false;
    };

    this.routeHasAllTags = function(route,tagList) {
        for(var j=0; j<tagList.length; j++){
            if(!this.routeHasTag(route,tagList[j])){
                return false;
            }
        }
        return true;
    };

    this.filterRoutesByTags = function(categoryList, tagList){
        for(var i=0; i<categoryList.length; i++) {
            if(categoryList[i].hasRouteList()){
                var routeLength = categoryList[i].getRouteList().length;
                var routeList = categoryList[i].getRouteList();
                for(var j=0; j<routeLength; j++) {
                    if(!this.routeHasAllTags(categoryList[i].getRoute(j),tagList)){
                        routeList[j] = null;
                    }
                }
                routeList = routeList.filter(function(n){ return n !== null });
                categoryList[i].setHasRouteList(true);
                categoryList[i].setRouteList(routeList);
                categoryList[i].setTotalResults(routeList.length);
            }
            if(categoryList[i].hasCategoryList()){
                this.filterRoutesByTags(categoryList[i].getCategoryList(),tagList);
            }
        }
    };

    /**
     * Decides if a node should be visible
     * @param {GUICategory} category
     */
    this.removeEmptyNodes = function(category){
        var total = category.getTotalResults();
        for(var i=0; i<category.getCategoryListCount(); i++) {
            var subCat = category.getCategory(i);
            category.setTotalResults(category.getTotalResults()+this.removeEmptyNodes(subCat));
            total += subCat.getTotalResults();
        }
        return total;
    };

    this.getGUICategoryListByTagList = function (tagList, parentIdList) {
        var defer = $q.defer();
        $http({
            method : "GET",
            url : "api_data/categories.json"
        }).then(function mySucces(response) {
            var categoryList = categoryFactory.buildNavigationListFromJson(response.data.categoryList,[]);
            self.filterRoutesByTags(categoryList,tagList);
            // if(parentIdList){
            //     self.markVisibleForNavigation(categoryList, parentIdList);
            // }
            self.markVisibleForSearch(categoryList);
            var cat = new GUICategory();
            cat.setName('Search results');
            cat.setHasCategoryList(true);
            cat.setIsVisible(true);
            cat.setCategoryList(categoryList);
            self.removeEmptyNodes(cat);
            console.log('cat', cat);
            defer.resolve(categoryList);
            //defer.resolve(categoryList);
        }, function myError(response) {
            defer.reject(response);
        });
        return defer.promise;
    };

}]);

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

app.service('routeService',['$q','categoryService', function ($q,categoryService) {

    var self = this;

    this.findRouteInCategory = function(categoryList, routeId) {
        var route = null;
        for(var i=0; i<categoryList.length; i++){
            if(categoryList[i].hasRouteList()) {
                for(var j=0; j<categoryList[i].getRouteList().length;j++){
                    route = categoryList[i].getRoute(j);
                    if(route.getId() === parseInt(routeId)) {
                        return route;
                    }
                }
            }
        }
        for(i=0; i<categoryList.length; i++) {
            if(categoryList[i].hasCategoryList()){
                return this.findRouteInCategory(categoryList[i].getCategoryList(), routeId);
            }
        }
    };

    this.getRouteById = function (id) {
        var defer = $q.defer();
        categoryService.getCategoryList().then(
            function mySucces(categoryList) {
                defer.resolve(self.findRouteInCategory(categoryList, id));
        }, function myError(response) {
            defer.reject(response);
        });
        return defer.promise;
    };
}]);

app.service('sandboxService',['$q','$http','transformRequestAsFormPost','GUIResponseFactory',
    function ($q,$http,transformRequestAsFormPost,responseFactory) {

    /**
     *
     * @param {string} url
     * @param {Param[]} parameters
     * @returns {*}
     */
    this.parseUrl = function(url, parameters) {
        for(var i=0; i<parameters.length; i++){
            if(parameters[i].getType() === "uri") {
                url = url.replace("[/:"+parameters[i].getName()+"]","/"+parameters[i].getExampleData());
                url = url.replace("[:"+parameters[i].getName()+"]",parameters[i].getExampleData());
            }
        }
        return url;
    };

    this.parseEnvironment = function(url, environment){
        if(environment instanceof Environment){
            return url.replace("{{environment}}",environment.getUrl());
        }
        return url;
    };

    /**
     * @TODO: Return object (url and styledUrl)
     * @param {string} url
     * @param {Param[]} parameters
     * @param {Environment} environment
     * @returns {*}
     */
    this.parseSandboxUrl = function(url, parameters, environment) {
        url = this.parseEnvironment(url,environment);
        for(var i=0; i<parameters.length; i++){
            var value = null;
            var name = parameters[i].name;
            if(parameters[i].enabled){
                value = angular.copy(parameters[i].value).toString();
            } else {
                value = null;
            }
            var frontSlash = value!==null && value.length>0?"/":"";
            var realValue = value===null?"":value;
            url = url.replace("[:"+name+"]",realValue);
            url = url.replace("[/:"+name+"]",frontSlash+realValue);
        }
        return url;
    };

    this.getEnabledPostVarList = function(postVarList) {
        var list = [];
        for(var i=0;i<postVarList.length;i++){
            if(postVarList[i].enabled && !postVarList[i].isFile){
                list[postVarList[i].name] = postVarList[i].value;
            }
        }
        return list;
    };

    this.getJsonPostVar = function(postVarList) {
        for(var i=0;i<postVarList.length;i++){
            if(!postVarList[i].hasName && postVarList[i].isJson){
                return postVarList[i].value;
            }
        }
        return null;
    };

    /**
     *
     * @param headers
     * @param {Route} route
     */
    this.overrideHeadersFromRoute = function (headers, route)
    {
        if(route.getRequest().hasHeaders()){
            var routeHeaderList = route.getResponse().getHeaders();
            for(var i=0; i<routeHeaderList.length; i++){
                headers[routeHeaderList[i].getName()] = routeHeaderList[i].getValue();
            }
        }
        return headers;
    };

    /**
     * @param {Route} route
     * @param {Object[]} paramList
     * @param {Object} authorization
     * @param {File[]} fileList
     * @returns {*}
     */
    this.callRoute = function (route, paramList, fileList, authorization) {
        var defer = $q.defer();
        var headers = {};
        var url = route.getRequest().getUrl();
        var method = route.getRequest().getMethod();
        if(route.getRequest().needsAuthentication()){
            headers[authorization.header] = authorization.token;
        }
        var params = this.getEnabledPostVarList(paramList);
        //Should be POST
        //Also for Delete?
        if(route.getRequest().hasFileParameter()){
            //Default header will be set to form-multipart
            headers['Content-Type'] = undefined;
            var fd = new FormData();
            var fileListArray = Object.keys(fileList).map(
                function (key) {
                    return {'name':key,'file':fileList[key]};
                }
            );
            var paramListArray = Object.keys(params).map(
                function (key) {
                    return {'name':key,'value':params[key]};
                }
            );
            angular.forEach(fileListArray,function(file){
                fd.append(file['name'],file['file']);
            });
            angular.forEach(paramListArray,function(file){
                fd.append(file['name'],file['value']);
            });
            $http({
                data: fd,
                headers: headers,
                method : method,
                transformRequest: angular.identity,
                url : url
            }).then(function mySucces(response, status, headers) {
                defer.resolve(responseFactory.buildFromRequestResponse(response));
            }, function myError(response) {
                defer.reject(responseFactory.buildFromRequestResponse(response));
            });
        } else {
            if(method === "POST"){
                var http = {};
                var jsonParam = this.getJsonPostVar(paramList);
                if(jsonParam !== null) {//for json post var with no name
                    headers = {'Content-Type':'application/json; charset=utf-8'};
                    headers = this.overrideHeadersFromRoute(headers, route);
                    http = $http({
                        headers: headers,
                        method : method,
                        url : this.parseUrl(url, route.getRequest().getParameterList()),
                        data: JSON.parse(jsonParam)
                    });
                } else {
                    headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
                    headers = this.overrideHeadersFromRoute(headers, route);
                    http = $http({
                        transformRequest: transformRequestAsFormPost,
                        headers: headers,
                        method : method,
                        url : this.parseUrl(url, route.getRequest().getParameterList()),
                        data: params
                    })
                }
                http.then(function mySucces(response, status, headers) {
                    defer.resolve(responseFactory.buildFromRequestResponse(response));
                }, function myError(response) {
                    defer.reject(responseFactory.buildFromRequestResponse(response));
                });
            } else {
                headers = this.overrideHeadersFromRoute(headers, route);
                $http({
                    headers: headers,
                    method : method,
                    url : this.parseUrl(url, route.getRequest().getParameterList())
                }).then(function mySucces(response, status, headers) {
                    defer.resolve(responseFactory.buildFromRequestResponse(response));
                }, function myError(response) {
                    defer.reject(responseFactory.buildFromRequestResponse(response));
                });
            }
        }
        return defer.promise;
    };



}]);

app.service('stateService',['$q','localStorageService','$state','$stateParams', function ($q,localStorageService,$state,$stateParams) {

    //var self = this;

    this.saveCurrentState = function() {
        localStorageService.set('beforeSearchStateParams', $stateParams);
        localStorageService.set('beforeSearchStateName', $state.current.name);
    };

    this.loadLastState = function() {
        var params = localStorageService.get('beforeSearchStateParams');
        var name = localStorageService.get('beforeSearchStateName');
        $state.go(name, params).then();
    };

    this.is = function(stateName){
        return $state.is(stateName);
    }

}]);

app.service('tagService',['$q','localStorageService', function ($q,localStorageService) {

    //var self = this;

    this.saveTagList = function(tagList) {
        localStorageService.set('tagList', tagList);
        return tagList;
    };


    this.getTagList = function() {
        var list = [];
        var tagList = localStorageService.get('tagList');
        if(!angular.isObject(tagList)){
            return [];
        }
        for(var i =0; i<tagList.length; i++){
            list.push(new Tag(tagList[i]));
        }
        return list;
    };
}]);

app.service('GUIResponseFactory', function () {

    this.buildFromRequestResponse = function (response) {
        var responseObj = new GUIResponse();
        responseObj.setData(response.data);
        responseObj.setStatusCode(response.status);
        responseObj.setResponseHeaders(response.headers());
        return responseObj;
    };

});

var GUICategory = function() {

    this.id = "";
    this.name = "";
    this.routeList = [];
    this.categoryList = [];
    this.has_category_list = false;
    this.is_visible = false;
    this.is_parent = false;
    this.parentIdList = [];
    this.needs_authentication = false;
    this.has_route_list=false;
    this.total_routes_found = 0;

    this.setTotalResults = function(total){
        this.total_routes_found = total;
        return this;
    };

    this.getTotalResults = function(){
        return this.total_routes_found ;
    };

    this.setId = function(id){
        this.id = id;
        return this;
    };

    this.getId = function(){
        return this.id ;
    };

    this.addRoute = function(route){
        this.routeList.push(route);
        return this;
    };


    this.setRouteList = function(list){
        this.routeList = list;
        return this;
    };

    this.getRouteList = function(){
        return this.routeList ;
    };

    this.getRoute = function(index){
        return this.routeList[index] ;
    };

    this.setHasRouteList = function(hasRoutes){
        return this.has_route_list = hasRoutes;
    };

    this.hasRouteList = function(){
        return this.has_route_list;
    };

    this.setCategoryList = function(categoryList){
        this.categoryList = categoryList;
        return this;
    };

    this.addCategory = function(category){
        this.categoryList.push(category);
        return this;
    };

    this.getCategoryList = function(){
        return this.categoryList ;
    };

    this.getCategory = function(i){
        return this.categoryList[i];
    };

    this.getCategoryListCount = function(){
        return this.categoryList.length ;
    };

    this.getRouteListCount = function(){
        return this.routeList.length ;
    };

    this.hasCategoryList = function(){
        return this.has_category_list;
    };

    this.setHasCategoryList = function(hasCatlist){
        this.has_category_list = hasCatlist;
        return this;
    };

    this.setName = function(name){
        this.name = name;
        return this;
    };

    this.getName = function(){
        return this.name ;
    };

    this.setIsVisible = function(isVisible){
        this.is_visible = isVisible;
        return this;
    };

    this.isVisible = function(){
        return this.is_visible ;
    };

    this.setIsParent = function(isParent){
        this.is_parent = isParent;
        return this;
    };

    this.isParent = function(){
        return this.is_parent ;
    };


    this.addParentId = function(parentId){
        this.parentIdList.push(parentId);
        return this;
    };

    this.getParentIdList = function(){
        return this.parentIdList ;
    };

    this.setParentIdList = function(parentList){
        this.parentIdList =parentList;
        return this.parentIdList;
    };

    this.setNeedsAuthentication = function(isNeeded){
        this.needs_authentication = isNeeded;
        return this;
    };

    this.needsAuthentication = function(){
        return this.needs_authentication ;
    };


};





var GUIResponse = function() {

    this.reponseHeaders = [];
    this.data = {};
    this.status = null;

    this.setData = function(data){
        this.data = data;
        return this;
    };

    this.getData = function(){
        return this.data ;
    };

    this.setResponseHeaders = function(headers){
        this.reponseHeaders = headers;
        return this;
    };

    this.getResponseHeaders = function(){
        return this.reponseHeaders ;
    };

    this.setStatusCode = function(status){
        this.status = status;
        return this;
    };

    this.getStatusCode = function(){
        return this.status ;
    };
};





var GUIRoute = function() {

    this.id = "";
    this.name = "";
    this.description = "";
    this.tagList = [];
    this.category = {};
    this.is_visible = false;
    this.has_tag_list=false;
    this.request=null;

    this.setId = function(id){
        this.id = id;
        return this;
    };

    this.getId = function(){
        return this.id ;
    };

    this.setRequest = function(request){
        this.request = request;
        return this;
    };

    this.getRequest = function(){
        return this.request ;
    };

    this.setName = function(name){
        this.name = name;
        return this;
    };

    this.getName = function(){
        return this.name ;
    };

    this.setDescription = function(desc){
        this.description = desc;
        return this;
    };

    this.getDescription = function(){
        return this.description ;
    };

    this.setCategory = function(category){
        this.category = category;
        return this;
    };

    this.getCategory = function(){
        return this.category ;
    };

    this.addTag = function(tag){
        return this.tagList.push(tag);
    };

    this.getTagList = function(){
        return this.tagList;
    };

    this.setTagList = function(tagList){
        return this.tagList = tagList;
    };

    this.getTag = function(i){
        return this.tagList[i];
    };

    this.setIsVisible = function(isVisible){
        this.is_visible = isVisible;
        return this;
    };

    this.isVisible = function(){
        return this.is_visible ;
    };

    this.setHasTagList = function(hasTags){
        this.has_tag_list = hasTags;
    };

    this.hasTagList = function(){
        return this.has_tag_list ;
    };
};




