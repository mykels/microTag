angular.module('microTag.core')
    .directive('mtActionPanel', actionPanelDirective);

function actionPanelDirective() {
    return {
        restrict: 'AE',
        scope: {
            actionData: '=',
            actionContext: '=',
            tooltipPlacement: '@',
            containerStyle: '@'
        },
        templateUrl: 'app/modules/core/views/actions/action-panel.html',
        controller: 'ActionPanelController'
    };
}
