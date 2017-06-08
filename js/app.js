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