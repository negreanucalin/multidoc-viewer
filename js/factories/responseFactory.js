app.service('responseFactory', function () {

    this.buildFromRequestResponse = function (response) {
        var responseObj = new Response();
        responseObj.setData(response.data);
        responseObj.setStatus(response.status);
        responseObj.setResponseHeaders(response.headers());
        return responseObj;
    };

});
