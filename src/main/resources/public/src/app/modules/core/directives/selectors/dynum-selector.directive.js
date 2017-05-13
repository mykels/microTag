angular.module('microTag.core')
    .directive('mtDynumSelector', dynumSelectorDirective);

function dynumSelectorDirective() {
    return {
        restrict: 'AE',
        scope: {
            dynumName: '@',
            options: "=",
            chosenOption: '=',
            isRequired: "="
        },
        replace: false,
        templateUrl: 'dynum-selector.html',
        controller: 'DynumSelectorController'
    };
}
