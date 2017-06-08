var Route = function() {

    this.id = "";
    this.name = "";
    this.description = "";
    this.tagList = [];
    this.category = {};
    this.response = {};
    this.request=null;
    this.statusCodeList = [];
    this.has_status_codes = false;
    this.has_tag_list = false;
    this.has_response=false;

    this.setId = function(id){
        this.id = id;
        return this;
    };

    this.getId = function(){
        return this.id ;
    };

    this.setResponse = function(Response){
        this.response = Response;
    };

    this.getResponse = function(){
        return this.response ;
    };

    this.setHasResponse = function(hasResponse){
        this.has_response = hasResponse;
    };

    this.hasResponse = function(){
        return this.has_response ;
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

    this.getTag = function(i){
        return this.tagList[i];
    };

    this.setTagList = function(tagList){
        return this.tagList = tagList;
    };


    this.setHasTagList = function(hasTags){
        this.has_tag_list = hasTags;
    };

    this.hasTagList = function(){
        return this.has_tag_list ;
    };

    this.setHasStatusCodes = function(hasCodes){
        this.has_status_codes = hasCodes;
        return this;
    };

    this.hasStatusCodes = function(){
        return this.has_status_codes ;
    };

    this.setStatusCodeList = function(statusCodes){
        this.statusCodeList = statusCodes;
        return this;
    };

    this.getStatusCodeList = function(){
        return this.statusCodeList ;
    };
};




