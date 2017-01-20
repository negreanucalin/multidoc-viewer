var Route = function() {

    this.id = "";
    this.name = "";
    this.description = "";
    this.method = "";
    this.tagList = [];
    this.parameterList = [];
    this.category = {};
    this.url = "";
    this.response_type = "";
    this.needs_authentication = false;


    this.setId = function(id){
        this.id = id;
        return this;
    };

    this.getId = function(){
        return this.id ;
    };

    this.setUrl = function(url){
        this.url = url;
        return this;
    };

    this.getUrl = function(){
        return this.url ;
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

    this.setMethod = function(method){
        this.method = method;
        return this;
    };

    this.getMethod = function(){
        return this.method ;
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

    this.getParameterList = function(){
        return this.parameterList;
    };

    this.setParameterList = function(parameterList){
        return this.parameterList = parameterList;
    };

    this.hasParameters = function(){
        return this.parameterList.length >0;
    };

    this.setResponseType = function(type){
        this.response_type = type;
        return this;
    };

    this.getResponseType = function(){
        return this.response_type ;
    };

    /**
     *
     * @returns {Param[]}
     */
    this.getUriParameterList = function(){
        var list = [];
        for(var i=0; i<this.parameterList.length;i++){
            if(this.parameterList[i].getType() == "uri") {
                list.push(this.parameterList[i]);
            }
        }
        return list;
    };

    this.getPostParameterList = function(){
        var list = [];
        for(var i=0; i<this.parameterList.length;i++){
            if(this.parameterList[i].getType() == "post") {
                list.push(this.parameterList[i]);
            }
        }
        return list;
    };

    this.hasPostParameterList = function(){
        for(var i=0; i<this.parameterList.length;i++){
            if(this.parameterList[i].getType() == "post") {
                return true;
            }
        }
        return false;
    };

    this.hasUriParameterList = function(){
        for(var i=0; i<this.parameterList.length;i++){
            if(this.parameterList[i].getType() == "uri") {
                return true;
            }
        }
        return false;
    };

    this.setNeedsAuthentication = function(isNeeded){
        this.needs_authentication = isNeeded;
        return this;
    };

    this.needsAuthentication = function(){
        return this.needs_authentication ;
    };
};




