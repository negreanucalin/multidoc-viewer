app.service('visualHelper', function () {

    this.getMethodColorByRoute = function (route) {
        if( route instanceof Route || route instanceof GUIRoute) {
            switch(route.getRequest().getMethod()) {
                case 'GET':
                    return 'primary';
                    break;
                case 'PUT':
                    return 'info';
                    break;
                case 'POST':
                    return 'success';
                    break;
                case 'PATCH':
                    return 'warning';
                    break;
                case 'DELETE':
                    return 'danger';
                    break;
                default:
                    return 'default';
                    break;
            }
        }
    };

    /**
     *
     * @param {GUICategory} category
     * @returns {boolean}
     */
    this.isAtLeastOneRouteVisible = function(category)
    {
        for(var i=0; i<category.getRouteList().length;i++){
            if(category.getRoute(i).isVisible()){
                return true;
            }
        }
        return false;
    }

});

