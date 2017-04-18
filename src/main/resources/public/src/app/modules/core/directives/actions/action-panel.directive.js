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
        templateUrl: 'action-panel.html',
        controller: 'ActionPanelController'
    };
}
