
app.controller("NavigationController", ['$scope','categoryService','visualHelper','$state','$stateParams',
    function ($scope,categoryService,visualHelper,$state,$stateParams) {

    $scope.visualHelper = visualHelper;
    $scope.categoryList = [];
    $scope.selectedMenu = "";
    categoryService.getCategoryList().then(
        function(categoryList) {
            $scope.categoryList = categoryList;
        }
    );

    if($state.is('projectDetails')) {
        $scope.selectedMenu = 'project_details';
    }
    if($state.is('routeDetails')) {
        $scope.selectedMenu = $stateParams.routeId;
    }


}]);
