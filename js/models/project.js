var Project = function() {

    this.name = "";
    this.description = "";
    this.version = 0;
    this.has_environments = false;
    this.environmentList = [];
    this.has_logo = false;
    this.logo = "";

    this.setName = function(name){
        this.name = name;
        return this;
    };

    this.getName = function(){
        return this.name ;
    };

    this.setEnvironmentList = function(envList){
        this.environmentList = envList;
        return this;
    };

    this.addEnvironment = function(env){
        this.environmentList.push(env);
    };

    this.getEnvironmentList = function(){
        return this.environmentList;
    };

    this.getEnvironment = function(i){
        return this.environmentList[i];
    };

    this.setHasEnvironmentList = function(hasEnv){
        this.has_environments = hasEnv;
        return this;
    };

    this.hasEnvironmentList = function(){
        return this.has_environments;
    };

    this.setLogo = function(logo){
        this.logo = logo;
        return this;
    };

    this.getLogo = function(){
        return this.logo ;
    };


    this.setHasLogo = function(haslogo){
        this.has_logo = haslogo;
        return this;
    };

    this.hasLogo = function(){
        return this.has_logo;
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




