var Tag = function() {

    this.name = "";

    this.setName = function(name){
        this.name = name;
        return this;
    };

    this.getName = function(){
        return this.name ;
    };

    var me = this,
        p = arguments[0];
    //constructor;
    p && tag();
    function tag(){
        for(var prop in p){
            //for safety you can use the hasOwnProperty function
            me[prop] = p[prop];
        }
    }

};




