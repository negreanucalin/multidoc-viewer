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
            //Display it
            categoryList[i].setIsVisible(true);
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
                //Display them
                categoryList[i].setIsVisible(true);
                if(routeList.length >0){
                    for(var k=0; k<routeList.length; k++){
                        routeList[k].setIsVisible(true);
                    }
                }
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
            var cat = new GUICategory();
            cat.setIsVisible(true);
            cat.setCategoryList(categoryList);
            self.removeEmptyNodes(cat);
            console.log('cat',cat);
            defer.resolve(cat);
        }, function myError(response) {
            defer.reject(response);
        });
        return defer.promise;
    };

}]);
