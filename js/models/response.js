var Response = function() {

    this.code = null;
    this.text = null;
    this.headerList = [];
    this.has_headers=false;


    this.setHasHeaders = function(hasHeaders){
        this.has_headers = hasHeaders;
        return this;
    };

    this.hasHeaders = function(){
        return this.has_headers ;
    };

    this.setCode = function(code){
        this.code = code;
        return this;
    };

    this.getCode = function(){
        return this.code ;
    };

    this.setText = function(text){
        this.text = text;
        return this;
    };

    this.getText = function(){
        return this.text;
    };

    this.setHeaders = function(headers){
        this.headerList = headers;
    };

    this.getHeaders = function(){
        return this.headerList;
    };
};


