angular.module('microTag.core')
    .directive('mtDetail', detailDirective);

function detailDirective() {
    return {
        restrict: 'AE',
        scope: {
            title: '@',
            titleStyle: '=?',
            detailClass: '@'
        },
        priority: 8,
        transclude: true,
        templateUrl: 'detail.html',
	    controller: "DetailController"
    };
}
