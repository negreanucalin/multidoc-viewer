app.service('projectFactory', function () {

    this.buildFromJson = function (projectJson) {
        var project = new Project();
        project.setName(projectJson.name);
        project.setDescription(projectJson.description);
        return project;
    };

});
