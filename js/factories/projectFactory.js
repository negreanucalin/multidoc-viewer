app.service('projectFactory', function () {

    this.buildEnvironment = function(envListJson){
        var env = new Environment();
        env.setUrl(envListJson.url);
        env.setName(envListJson.name);
        return env;
    };


    this.buildEnvironmentList = function(envListJson){
        var list = [];
        for(var i=0; i<envListJson.length;i++){
            list.push(this.buildEnvironment(envListJson[i]));
        }
        return list;
    };


    this.buildFromJson = function (projectJson) {
        var project = new Project();
        project.setName(projectJson.name);
        project.setDescription(projectJson.description);
        project.setVersion(projectJson.version);
        project.setBuildDate(projectJson.buildDate);
        if(projectJson.logo) {
            project.setLogo(projectJson.logo);
            project.setHasLogo(true);
        }
        if(projectJson.environments) {
            project.setHasEnvironmentList(true);
            project.setEnvironmentList(this.buildEnvironmentList(projectJson.environments));
        }
        return project;
    };

});
