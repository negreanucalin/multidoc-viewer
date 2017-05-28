app.service('GUIResponseFactory', function () {

    this.buildFromRequestResponse = function (response) {
        var responseObj = new GUIResponse();
        responseObj.setData(response.data);
        responseObj.setStatusCode(response.status);
        responseObj.setResponseHeaders(response.headers());
        return responseObj;
    };

});
