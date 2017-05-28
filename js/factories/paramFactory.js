app.service('paramFactory', function () {

    this.buildParamFromJson = function (request, paramJSON) {
        var param = new Param();
        param.setDescription(paramJSON.description);
        param.setType(paramJSON.type);
        param.setIsOptional(paramJSON.isOptional);
        param.setDataType(paramJSON.data_type);
        if(paramJSON.data_type === 'file') {
            param.setIsFile(true);
            if(request){ //not when navigation (menu)
                request.setHasFileParameter(true);
            }
        }
        param.setExampleData(paramJSON.example);
        if(paramJSON.default){
            param.setHasDefaultValue(true);
            param.setDefaultValue(paramJSON.default);
        }
        if(paramJSON.listOption){
            param.setHasPossibleValues(true);
            param.setPossibleValues(paramJSON.listOption);
        }
        if(paramJSON.data_type === 'json'){
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

    /**
     *
     * @param request
     * @param paramsJSON
     * @returns {Array}
     */
    this.buildParamListFromJson = function (request, paramsJSON) {
        var list = [];
        for(var i=0; i<paramsJSON.length; i++){
            list.push(this.buildParamFromJson(request, paramsJSON[i]));
        }
        return list;
    };

});
