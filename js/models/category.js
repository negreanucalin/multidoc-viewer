var Category = function() {

    this.id = "";
    this.name = "";

    this.routeList = [];

    this.categoryList = [];

    this.setId = function(id){
        this.id = id;
        return this;
    };

    this.getId = function(){
        return this.id ;
    };

    this.addRoute = function(route){
        this.routeList.push(route);
        return this;
    };

    this.getRouteList = function(){
        return this.routeList ;
    };

    this.getRoute = function(index){
        return this.routeList[index] ;
    };

    this.hasRouteList = function(){
        return this.routeList.length > 0;
    };

    this.setCategoryList = function(categoryList){
        this.categoryList = categoryList;
        return this;
    };

    this.addCategory = function(category){
        this.categoryList.push(category);
        return this;
    };

    this.getCategoryList = function(){
        return this.categoryList ;
    };

    this.getCategoryListCount = function(){
        return this.categoryList.length ;
    };

    this.getRouteListCount = function(){
        return this.routeList.length ;
    };


    this.hasCategoryList = function(){
        return this.categoryList.length > 0;
    };

    this.setName = function(name){
        this.name = name;
        return this;
    };

    this.getName = function(){
        return this.name ;
    };
};




