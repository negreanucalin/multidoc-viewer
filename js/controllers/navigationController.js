
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
        $scope.selectedMenu = 'project_details';
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
