
app.controller("NavigationController", ['$scope','categoryService','visualHelper','$state','$stateParams',
    function ($scope,categoryService,visualHelper,$state,$stateParams) {

    $scope.visualHelper = visualHelper;
    $scope.categoryList = [];
    $scope.selectedMenu = "";
    categoryService.getNavigationCategoryList().then(
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

    /**
     *
     * @param {NavigationCategory} category
     */
    $scope.toggleVisibility = function(category){
        if(category.hasCategoryList()){
            for(var i=0; i<category.getCategoryListCount(); i++){
                var category = category.getCategory(i);
                category.setIsVisible(!category.isVisible());
            }
        } else {
            for(i=0; i<category.getRouteListCount(); i++){
                var route = category.getRoute(i);
                route.setIsVisible(!route.isVisible());
            }
        }
    }

}]);
