var app = angular.module("multidoc", ['ui.router','jsonFormatter']);

app.config(function($stateProvider, $urlRouterProvider) {

      $stateProvider
		.state('projectDetails', {
            url: '/project',
            views: {
                'content': {
                    templateUrl: 'includes/project.html',
                    controller:'projectCtrl',
                },
                'navigation': {
                    templateUrl: 'includes/navigation.html',
                    controller: 'NavigationController'
                }
            }
        })
          .state('routeDetails', {
              url: '/route/:routeId',
              views: {
                  'content': {
                      templateUrl: 'includes/route.html',
                      controller:'routeCtrl',
                  },
                  'navigation': {
                      templateUrl: 'includes/navigation.html',
                      controller: 'NavigationController'
                  }
              }
          });
	  $urlRouterProvider.otherwise('/project');
    }
);

app.filter("trust", ['$sce', function($sce) {
    return function(htmlCode){
        return $sce.trustAsHtml(htmlCode);
    }
}]);