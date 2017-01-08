app.service('visualHelper', function () {

    this.getMethodColorByRoute = function (route) {
        if( route instanceof Route) {
            switch(route.getMethod()) {
                case 'GET':
                    return 'label label-primary';
                    break;
                case 'PUT':
                    return 'label label-info';
                    break;
                case 'POST':
                    return 'label label-success';
                    break;
                case 'PATCH':
                    return 'label label-warning';
                    break;
                case 'DELETE':
                    return 'label label-danger';
                    break;
                default:
                    return 'label label-default';
                    break;
            }
        }
    };

    this.addColorToUrlParameter = function (urlParam) {
        return "<span class='label label-default'>"+urlParam+"</span>";
    };

});

