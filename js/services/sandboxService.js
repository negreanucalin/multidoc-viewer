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
            if(parameters[i].getType() === "uri") {
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
        return url;
    };

    /**
     * @TODO: Return object (url and styledUrl)
     * @param {string} url
     * @param {Param[]} parameters
     * @param {Environment} environment
     * @returns {*}
     */
    this.parseSandboxUrl = function(url, parameters, environment) {
        url = this.parseEnvironment(url,environment);
        for(var i=0; i<parameters.length; i++){
            var value = null;
            var name = parameters[i].name;
            if(parameters[i].enabled){
                value = angular.copy(parameters[i].value).toString();
            } else {
                value = null;
            }
            var frontSlash = value!==null && value.length>0?"/":"";
            var realValue = value===null?"":value;
            url = url.replace("[:"+name+"]",realValue);
            url = url.replace("[/:"+name+"]",frontSlash+realValue);
        }
        return url;
    };

    this.getEnabledPostVarList = function(postVarList) {
        var list = [];
        for(var i=0;i<postVarList.length;i++){
            if(postVarList[i].enabled && !postVarList[i].isFile){
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
     * @param {File[]} fileList
     * @returns {*}
     */
    this.callRoute = function (route, paramList, fileList, authorization) {
        var defer = $q.defer();
        var headers = {};
        var url = route.getRequest().getUrl();
        var method = route.getRequest().getMethod();
        if(route.getRequest().needsAuthentication()){
            headers[authorization.header] = authorization.token;
        }
        var params = this.getEnabledPostVarList(paramList);
        //Should be POST
        //Also for Delete?
        if(route.getRequest().hasFileParameter()){
            headers['Content-Type'] = undefined;
            var fd = new FormData();
            var fileListArray = Object.keys(fileList).map(
                function (key) {
                    return {'name':key,'file':fileList[key]};
                }
            );
            var paramListArray = Object.keys(params).map(
                function (key) {
                    return {'name':key,'value':params[key]};
                }
            );
            angular.forEach(fileListArray,function(file){
                fd.append(file['name'],file['file']);
            });
            angular.forEach(paramListArray,function(file){
                fd.append(file['name'],file['value']);
            });
            $http({
                data: fd,
                headers: headers,
                method : method,
                transformRequest: angular.identity,
                url : url
            }).then(function mySucces(response, status, headers) {
                defer.resolve(responseFactory.buildFromRequestResponse(response));
            }, function myError(response) {
                defer.reject(response);
            });
        } else {
            if(method === "POST"){
                var http = {};
                var jsonParam = this.getJsonPostVar(paramList);
                if(jsonParam !== null) {//for json post var with no name
                    headers = {'Content-Type':'application/json; charset=utf-8'};
                    http = $http({
                        headers: headers,
                        method : method,
                        url : this.parseUrl(url, route.getRequest().getParameterList()),
                        data: JSON.parse(jsonParam)
                    });
                } else {
                    headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
                    http = $http({
                        transformRequest: transformRequestAsFormPost,
                        headers: headers,
                        method : method,
                        url : this.parseUrl(url, route.getRequest().getParameterList()),
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
                    method : method,
                    url : this.parseUrl(url, route.getRequest().getParameterList())
                }).then(function mySucces(response, status, headers) {
                    defer.resolve(responseFactory.buildFromRequestResponse(response));
                }, function myError(response) {
                    defer.reject(response);
                });
            }
        }
        return defer.promise;
    };



}]);
