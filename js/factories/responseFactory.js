app.service('responseFactory', [ 'headerFactory', function (headerFactory) {

    this.buildFromRequestResponse = function (response) {
        var responseObj = new Response();
        responseObj.setCode(response.code);
        responseObj.setText(response.status);
        if(response.headers) {
            responseObj.setHasHeaders(true);
            responseObj.setHeaders(headerFactory.buildHeaderListFromJson(response.headers));
        }
        return responseObj;
    };

}]);
