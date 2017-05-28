app.service('requestFactory', ['paramFactory','headerFactory',function (paramFactory, headerFactory) {

    /**
     *
     * @returns {Request}
     */
    this.buildRequestFromJson = function (requestJSON) {
        var request = new Request();
        request.setUrl(requestJSON.url);
        request.setMethod(requestJSON.method.toUpperCase());
        if(typeof requestJSON.needsAuthentication !== "undefined"){
            request.setNeedsAuthentication(requestJSON.needsAuthentication);
        }
        if(requestJSON.params) {
            request.setParameterList(paramFactory.buildParamListFromJson(request, requestJSON.params));
        }
        if(requestJSON.headers) {
            request.setHasHeaders(true);
            request.setHeaders(headerFactory.buildHeaderListFromJson(requestJSON.headers));
        }
        return request;
    };

}]);
