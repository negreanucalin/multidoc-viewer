app.service('sandboxService',['$q','$http','transformRequestAsFormPost', function ($q,$http,transformRequestAsFormPost) {

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

    /**
     *
     * @param {string} url
     * @param {Param[]} parameters
     * @returns {*}
     */
    this.parseSandboxUrl = function(url, parameters) {
        for(var i=0; i<parameters.length; i++){
            var value = null;
            var name = parameters[i].name;
            if(parameters[i].enabled){
                value = angular.copy(parameters[i].value).toString();
            } else {
                value = null;
            }
            var frontSlash = value!=null && value.length>0?"/":"";
            console.log(name,value!=null && value.length>0);
            var realValue = value==null?"":value;
            url = url.replace("[:"+name+"]",realValue);
            url = url.replace("[/:"+name+"]",frontSlash+realValue);

        }
        return url;
    };

    this.getEnabledPostVarList = function(postVarList) {
        var list = {};
        for(var i=0;i<postVarList.length;i++){
            if(postVarList[i].enabled){
                list[postVarList[i].name] = postVarList[i].value;
            }
        }
        return list;
    };

    /**
     * @param {Route} route
     * @param {Object[]} paramList
     * @returns {*}
     */
    this.runExample = function (route, paramList) {
        var defer = $q.defer();
        if(route.getMethod() == "POST"){
            var params = this.getEnabledPostVarList(paramList);
            var headers = {'Content-Type':'application/x-www-form-urlencoded'};
            $http({
                transformRequest: transformRequestAsFormPost,
                headers: headers,
                method : route.getMethod(),
                url : this.parseUrl(route.getUrl(), route.getParameterList()),
                data: params
            }).then(function mySucces(response) {
                defer.resolve(response.data);
            }, function myError(response) {
                defer.reject(response);
            });
        } else {
            $http({
                method : route.getMethod(),
                url : this.parseUrl(route.getUrl(), route.getParameterList())
            }).then(function mySucces(response) {
                defer.resolve(response.data);
            }, function myError(response) {
                defer.reject(response);
            });
        }

        return defer.promise;
    };



}]);
