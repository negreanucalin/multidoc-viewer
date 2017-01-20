app.service('stateService',['$q','localStorageService','$state','$stateParams', function ($q,localStorageService,$state,$stateParams) {

    //var self = this;

    this.saveCurrentState = function() {
        localStorageService.set('beforeSearchStateParams', $stateParams);
        localStorageService.set('beforeSearchStateName', $state.current.name);
    };

    this.loadLastState = function() {
        var params = localStorageService.get('beforeSearchStateParams');
        var name = localStorageService.get('beforeSearchStateName');
        $state.go(name, params).then();
    };

    this.is = function(stateName){
        return $state.is(stateName);
    }

}]);
