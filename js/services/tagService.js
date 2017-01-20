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
