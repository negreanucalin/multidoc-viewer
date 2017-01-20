var Project = function() {

    this.name = "";
    this.description = "";
    this.version = 0;

    this.setName = function(name){
        this.name = name;
        return this;
    };

    this.getName = function(){
        return this.name ;
    };

    this.setBuildDate = function(bd){
        this.buildDate = bd;
        return this;
    };

    this.getBuildDate = function(){
        return this.buildDate;
    };

    this.setVersion = function(ver){
        this.version = ver;
        return this;
    };

    this.getVersion = function(){
        return this.version;
    };

    this.setDescription = function(desc){
        this.description = desc;
        return this;
    };

    this.getDescription = function(){
        return this.description ;
    };

};




