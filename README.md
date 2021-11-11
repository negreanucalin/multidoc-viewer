# Multidoc viewer

## Not yet stable, in testing phase!

#### Check out [Multidoc parser](https://github.com/negreanucalin/multidoc-parser)
#### Did you say [Laravel?](https://github.com/negreanucalin/multidoc-laravel)

### Documentation path

`ROOT/vendor/multidoc/api_data` - both categories.json and project.json files

### Known issues


### TODO list

* Add custom headers when running sandbox
* Validation
	1. Before running either test or Sandbox validate mandatory params
* Add modal to display messages (See when needing authorization header)
* Add to localstorage to avoid trafic (loading of json)?
* Title of project in document title
* Add code generation (PHP, Python?, jquery, angular? etc)
* Add compare feature (Diff of tree structure)
* Do something with partials: 
	1. Maybe add to dist
	2. Add them in 1 file as templates
* Customization:
	1. Add option to put an app logo
	2. Bigger image on "Project overview"
	3. MD parser as description?
* Add cursor if no folder children available
* Improve search:
	* When removing tags don't redirect to project view