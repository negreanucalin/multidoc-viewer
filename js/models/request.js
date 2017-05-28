var Request = function() {

    this.method = "";
    this.url = "";
    this.needs_authentication = false;
    this.parameterList = [];
    this.headerList = [];
    this.has_file_parameter=false;
    this.has_headers=false;

    this.setHasHeaders = function(hasHeaders){
        this.has_headers = hasHeaders;
        return this;
    };

    this.hasHeaders = function(){
        return this.has_headers ;
    };

    this.setUrl = function(url){
        this.url = url;
        return this;
    };

    this.getUrl = function(){
        return this.url ;
    };

    this.setHeaders = function(headers){
        this.headerList = headers;
        return this;
    };

    this.getHeaders = function(){
        return this.headerList ;
    };

    this.setMethod = function(method){
        this.method = method;
        return this;
    };

    this.getMethod = function(){
        return this.method ;
    };

    this.setNeedsAuthentication = function(isNeeded){
        this.needs_authentication = isNeeded;
        return this;
    };

    this.needsAuthentication = function(){
        return this.needs_authentication ;
    };

    /**
     *
     * @returns {Param[]}
     */
    this.getUriParameterList = function(){
        var list = [];
        for(var i=0; i<this.parameterList.length;i++){
            if(this.parameterList[i].getType() === "uri") {
                list.push(this.parameterList[i]);
            }
        }
        return list;
    };

    this.getPostParameterList = function(){
        var list = [];
        for(var i=0; i<this.parameterList.length;i++){
            if(this.parameterList[i].getType() === "post") {
                list.push(this.parameterList[i]);
            }
        }
        return list;
    };

    this.hasPostParameterList = function(){
        for(var i=0; i<this.parameterList.length;i++){
            if(this.parameterList[i].getType() === "post") {
                return true;
            }
        }
        return false;
    };

    this.hasUriParameterList = function(){
        for(var i=0; i<this.parameterList.length;i++){
            if(this.parameterList[i].getType() === "uri") {
                return true;
            }
        }
        return false;
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

    this.setHasFileParameter = function(hasFile){
        this.has_file_parameter = hasFile;
        return this;
    };

    this.hasFileParameter = function(){
        return this.has_file_parameter ;
    };

};