angular.module('microTag.core')
    .directive('mtGroupActionSelector', groupActionSelectorDirective);

function groupActionSelectorDirective() {
    return {
        restrict: 'AE',
        scope: {
            actions: '=',
            entities: '=',
            useSingleCallback: '=?',
            selectedProperty: '@'
        },
        templateUrl: 'group-action-selector.html',
        controller: 'GroupActionSelectorController'
    };
}
