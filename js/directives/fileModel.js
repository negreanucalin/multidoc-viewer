app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attributes) {
            element.bind('change', function () {
                $parse(attributes.fileModel)
                    .assign(scope,element[0].files)
                scope.$apply()
            });
        }
    };
}]);