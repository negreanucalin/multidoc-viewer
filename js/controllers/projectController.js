
app.controller("projectCtrl", ['$scope','projectService','$state',function ($scope,projectService,$state) {

	$scope.project = new Project();

	projectService.getProject().then(function(project) {
		$scope.project = project;
	}, function(error){
        $state.go('missingConfig');
	});


}]);
