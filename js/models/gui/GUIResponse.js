var GUIResponse = function() {

    this.reponseHeaders = [];
    this.data = {};
    this.status = null;

    this.setData = function(data){
        this.data = data;
        return this;
    };

    this.getData = function(){
        return this.data ;
    };

    this.setResponseHeaders = function(headers){
        this.reponseHeaders = headers;
        return this;
    };

    this.getResponseHeaders = function(){
        return this.reponseHeaders ;
    };

    this.setStatusCode = function(status){
        this.status = status;
        return this;
    };

    this.getStatusCode = function(){
        return this.status ;
    };
};




