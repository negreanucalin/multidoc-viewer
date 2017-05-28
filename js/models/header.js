var Header = function() {

    this.name = null;

    this.value = null;

    this.setName = function(name){
        this.name = name;
        return this;
    };

    this.getName = function(){
        return this.name ;
    };

    this.setValue = function(value){
        this.value = value;
        return this;
    };

    this.getValue = function(){
        return this.value ;
    };
};




