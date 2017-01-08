app.service('tagFactory', function () {

    this.buildTagFromJson = function (tagJSON) {
        var tag = new Tag();
        tag.setName(tagJSON);
        return tag;
    };

    this.buildTagListFromJson = function (tagsJSON) {
        var list = [];
        for(var i=0; i<tagsJSON.length; i++){
            list.push(this.buildTagFromJson(tagsJSON[i]));
        }
        return list;
    };

});
