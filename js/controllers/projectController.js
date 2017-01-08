
app.controller("projectCtrl", ['$scope','projectService',function ($scope,projectService) {

	$scope.project = new Project();

	projectService.getProject().then(function(project) {
		$scope.project = project;
	});


}]);
