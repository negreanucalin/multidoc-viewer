app.service('paramFactory', function () {

    this.buildParamFromJson = function (paramJSON) {
        var param = new Param();
        param.setDescription(paramJSON.description);
        param.setType(paramJSON.type);
        param.setIsOptional(paramJSON.isOptional);
        param.setDataType(paramJSON.data_type);
        param.setExampleData(paramJSON.example);
        if(paramJSON.default){
            param.setHasDefaultValue(true);
            param.setDefaultValue(paramJSON.default);
        }
        if(paramJSON.listOption){
            param.setHasPossibleValues(true);
            param.setPossibleValues(paramJSON.listOption);
        }
        if(paramJSON.data_type == 'json'){
            param.setIsJsonParam(true);
            if(paramJSON.name){
                param.setName(paramJSON.name);
                param.setHasName(true);
            }
        } else {
            param.setName(paramJSON.name);
        }
        return param;
    };

    this.buildParamListFromJson = function (paramsJSON) {
        var list = [];
        for(var i=0; i<paramsJSON.length; i++){
            list.push(this.buildParamFromJson(paramsJSON[i]));
        }
        return list;
    };

});
