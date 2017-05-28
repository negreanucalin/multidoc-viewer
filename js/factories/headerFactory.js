app.service('headerFactory', function () {

    this.buildHeaderFromJson = function (headerJson) {
        var header = new Header();
        header.setName(headerJson.name);
        header.setValue(headerJson.value);
        return header;
    };

    this.buildHeaderListFromJson = function (headersJson) {
        var list = [];
        for(var i=0; i<headersJson.length; i++){
            list.push(this.buildHeaderFromJson(headersJson[i]));
        }
        return list;
    };

});
