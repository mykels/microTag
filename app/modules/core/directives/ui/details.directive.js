angular.module('microTag.core')
    .directive('mtDetails', detailsDirective);

function detailsDirective() {
    return {
        restrict: 'AE',
        scope: {},
        transclude: true,
        template: '<dl class="dl-horizontal"><div ng-transclude></div></dl>'
    };
}
