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
        templateUrl: 'src/app/modules/core/views/selectors/group-action-selector.html',
        controller: 'GroupActionSelectorController'
    };
}
