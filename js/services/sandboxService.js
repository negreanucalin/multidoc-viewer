app.service('sandboxService',['$q','$http','transformRequestAsFormPost','responseFactory',
    function ($q,$http,transformRequestAsFormPost,responseFactory) {

    /**
     *
     * @param {string} url
     * @param {Param[]} parameters
     * @returns {*}
     */
    this.parseUrl = function(url, parameters) {
        for(var i=0; i<parameters.length; i++){
            if(parameters[i].getType() == "uri") {
                url = url.replace("[/:"+parameters[i].getName()+"]","/"+parameters[i].getExampleData());
                url = url.replace("[:"+parameters[i].getName()+"]",parameters[i].getExampleData());
            }
        }
        return url;
    };

    this.parseEnvironment = function(url, environment){
        if(environment instanceof Environment){
            return url.replace("{{environment}}",environment.getUrl());
        }
    };

    /**
     *
     * @param {string} url
     * @param {Param[]} parameters
     * @returns {*}
     */
    this.parseSandboxUrl = function(url, parameters,environment) {
        url = this.parseEnvironment(url,environment);
        for(var i=0; i<parameters.length; i++){
            var value = null;
            var name = parameters[i].name;
            if(parameters[i].enabled){
                value = angular.copy(parameters[i].value).toString();
            } else {
                value = null;
            }
            var frontSlash = value!=null && value.length>0?"/":"";
            var realValue = value==null?"":value;
            url = url.replace("[:"+name+"]",realValue);
            url = url.replace("[/:"+name+"]",frontSlash+realValue);
        }
        return url;
    };

    this.getEnabledPostVarList = function(postVarList) {
        var list = [];
        for(var i=0;i<postVarList.length;i++){
            if(postVarList[i].enabled){
                list[postVarList[i].name] = postVarList[i].value;
            }
        }
        return list;
    };

    this.getJsonPostVar = function(postVarList) {
        for(var i=0;i<postVarList.length;i++){
            if(!postVarList[i].hasName && postVarList[i].isJson){
                return postVarList[i].value;
            }
        }
        return null;
    };

    /**
     * @param {Route} route
     * @param {Object[]} paramList
     * @param {Object} authorization
     * @returns {*}
     */
    this.runExample = function (route, paramList,authorization) {
        var defer = $q.defer();
        var headers = {};
        if(route.needsAuthentication()){
            headers[authorization.header] = authorization.token;
        }
        if(route.getMethod() === "POST"){
            var http = {};
            var params = this.getEnabledPostVarList(paramList);
            var jsonParam = this.getJsonPostVar(paramList);
            if(jsonParam !== null) {//for json post var with no name
                headers = {'Content-Type':'application/json; charset=utf-8'};
                http = $http({
                    headers: headers,
                    method : route.getMethod(),
                    url : this.parseUrl(route.getUrl(), route.getParameterList()),
                    data: JSON.parse(jsonParam)
                });
            } else {
                headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
                http = $http({
                    transformRequest: transformRequestAsFormPost,
                    headers: headers,
                    method : route.getMethod(),
                    url : this.parseUrl(route.getUrl(), route.getParameterList()),
                    data: params
                })
            }
            http.then(function mySucces(response, status, headers) {
                defer.resolve(responseFactory.buildFromRequestResponse(response));
            }, function myError(response) {
                defer.reject(response);
            });
        } else {
            $http({
                headers: headers,
                method : route.getMethod(),
                url : this.parseUrl(route.getUrl(), route.getParameterList())
            }).then(function mySucces(response, status, headers) {
                defer.resolve(responseFactory.buildFromRequestResponse(response));
            }, function myError(response) {
                defer.reject(response);
            });
        }

        return defer.promise;
    };



}]);
