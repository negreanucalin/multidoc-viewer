app.service('statusFactory', function () {

    this.buildListFromJson = function (statusJSON) {
        var statusList = [];
        statusJSON.sort(function(a, b) {
            return parseInt(a.code) - parseInt(b.code);
        });
        for(var i=0; i<statusJSON.length; i++) {
            var status = new Status();
            status.setCode(statusJSON[i].code);
            status.setMessage(statusJSON[i].message);
            status.setDescription(statusJSON[i].description);
            statusList.push(status);
        }
        return statusList;
    };


});
