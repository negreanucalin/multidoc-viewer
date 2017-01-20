
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
