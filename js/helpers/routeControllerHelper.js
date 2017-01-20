app.service('routeControllerHelper', function () {

    /**
     *
     * @param {Param[]} list
     */
    this.convertUriParameterList = function (list) {
        var paramList = [];
        for(var i=0; i<list.length;i++){
            paramList.push({
                "name":list[i].getName(),
                "value":list[i].getExampleData(),
                "required":!list[i].isOptional(),
                "enabled":true,
                "has_default":list[i].hasDefaultValue(),
                "default":list[i].getDefaultValue(),
                "hasListValues":list[i].hasPossibleValues(),
                "listValues":list[i].getPossibleValues()
            });
        }
        return paramList;
    };

    /**
     *
     * @param {Param[]} list
     */
    this.convertPostParameterList = function (list) {
        var paramList = [];
        for(var i=0; i<list.length;i++){
        paramList.push({
                "name":list[i].getName(),
                "value":list[i].getExampleData(),
                "required":!list[i].isOptional(),
                "enabled":true,
                "has_default":list[i].hasDefaultValue(),
                "default":list[i].getDefaultValue(),
                "hasListValues":list[i].hasPossibleValues(),
                "listValues":list[i].getPossibleValues(),
                //Json type param
                "isJson":list[i].isJsonParam(),
                "hasName":list[i].hasName()
            });
        }
        return paramList;
    };





});

