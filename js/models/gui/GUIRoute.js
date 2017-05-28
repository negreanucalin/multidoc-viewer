var GUIRoute = function() {

    this.id = "";
    this.name = "";
    this.description = "";
    this.tagList = [];
    this.category = {};
    this.is_visible = false;
    this.has_tag_list=false;
    this.request=null;

    this.setId = function(id){
        this.id = id;
        return this;
    };

    this.getId = function(){
        return this.id ;
    };

    this.setRequest = function(request){
        this.request = request;
        return this;
    };

    this.getRequest = function(){
        return this.request ;
    };

    this.setName = function(name){
        this.name = name;
        return this;
    };

    this.getName = function(){
        return this.name ;
    };

    this.setDescription = function(desc){
        this.description = desc;
        return this;
    };

    this.getDescription = function(){
        return this.description ;
    };

    this.setCategory = function(category){
        this.category = category;
        return this;
    };

    this.getCategory = function(){
        return this.category ;
    };

    this.addTag = function(tag){
        return this.tagList.push(tag);
    };

    this.getTagList = function(){
        return this.tagList;
    };

    this.setTagList = function(tagList){
        return this.tagList = tagList;
    };

    this.getTag = function(i){
        return this.tagList[i];
    };

    this.setIsVisible = function(isVisible){
        this.is_visible = isVisible;
        return this;
    };

    this.isVisible = function(){
        return this.is_visible ;
    };

    this.setHasTagList = function(hasTags){
        this.has_tag_list = hasTags;
    };

    this.hasTagList = function(){
        return this.has_tag_list ;
    };
};




