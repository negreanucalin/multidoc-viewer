var Status = function() {

    this.code = null;
    this.description = null;
    this.message = null;

    this.setCode = function(code){
        this.code = code;
        return this;
    };

    this.getCode = function(){
        return this.code ;
    };

    this.setDescription = function(description){
        this.description = description;
        return this;
    };

    this.getDescription = function(){
        return this.description ;
    };

    this.setMessage = function(message){
        this.message = message;
        return this;
    };

    this.getMessage = function(){
        return this.message ;
    };

};


