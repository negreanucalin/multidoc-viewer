var Param = function() {

    this.name = "";
    this.description = "";
    this.type="";
    this.is_optional = false;
    this.data_type = "string";
    this.example_data = "";
    this.defaultValue = "";
    this.has_default_value = false;
    this.possibleValueList = [];
    this.hasPossibleValueList = false;
    this.isJson = false;
    this.thisParamHasName = false;

    this.setName = function(name){
        this.name = name;
        return this;
    };

    this.getName = function(){
        return this.name ;
    };

    this.setDescription = function(desc){
        this.description = desc;
        return this;
    };

    this.getDescription = function(){
        return this.description ;
    };

    this.setType = function(type){
        this.type = type;
        return this;
    };

    this.getType = function(){
        return this.type ;
    };

    this.setIsOptional = function(isOpt){
        this.is_optional = isOpt;
        return this;
    };

    this.isOptional = function(){
        return this.is_optional;
    };

    this.setDataType = function(data){
        this.data_type = data;
        return this;
    };

    this.getDataType = function(){
        return this.data_type;
    };

    this.setExampleData = function(data){
        this.example_data = data;
        return this;
    };

    this.getExampleData = function(){
        return this.example_data;
    };

    this.setDefaultValue = function(value){
        this.defaultValue = value;
        return this;
    };

    this.getDefaultValue = function(){
        return this.defaultValue;
    };

    this.setHasDefaultValue = function(value){
        this.has_default_value = value;
        return this;
    };

    this.hasDefaultValue = function(){
        return this.has_default_value;
    };

    this.setPossibleValues = function(values){
        this.possibleValueList = values;
        return this;
    };

    this.getPossibleValues = function(){
        return this.possibleValueList;
    };

    this.hasPossibleValues = function(){
        return this.hasPossibleValueList;
    };

    this.setHasPossibleValues = function(has){
        this.hasPossibleValueList = has;
        return this;
    };

    this.setIsJsonParam = function(isJson){
        this.isJson = isJson;
        return this;
    };

    this.isJsonParam = function(){
        return this.isJson;
    };

    this.setHasName = function(hasName){
        this.thisParamHasName = hasName;
        return this;
    };

    this.hasName = function(hasName){
        return this.thisParamHasName;
    };
};