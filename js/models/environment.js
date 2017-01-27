var Environment = function() {

    this.name = "";
    this.url = "";

    this.setName = function(name){
        this.name = name;
        return this;
    };

    this.getName = function(){
        return this.name ;
    };


    this.setUrl = function(url){
        this.url = url;
        return this;
    };

    this.getUrl = function(){
        return this.url ;
    };

    var me = this,
        p = arguments[0];
    //constructor;
    p && environment();
    function environment(){
        for(var prop in p){
            //for safety you can use the hasOwnProperty function
            me[prop] = p[prop];
        }
    }
};