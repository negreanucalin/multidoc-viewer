var Response = function() {

    this.reponseHeaders = [];
    this.data = {};
    this.status = 200;

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

    this.setStatus = function(status){
        this.status = status;
        return this;
    };

    this.getStatus = function(){
        return this.status ;
    };
};




