app.service('projectFactory', function () {

    this.buildFromJson = function (projectJson) {
        var project = new Project();
        project.setName(projectJson.name);
        project.setDescription(projectJson.description);
        project.setVersion(projectJson.version);
        project.setBuildDate(projectJson.buildDate);
        return project;
    };

});
