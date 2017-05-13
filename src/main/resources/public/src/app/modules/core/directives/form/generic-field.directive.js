angular.module('microTag.core')
    .directive('mtGenericField', genericFieldDirective);

function genericFieldDirective() {
    return {
        restrict: 'AE',
        scope: {
            field: '=',
            fieldModelContainer: '='
        },
        replace: false,
        templateUrl: 'generic-field.html',
        controller: 'GenericFieldController'
    };
}
