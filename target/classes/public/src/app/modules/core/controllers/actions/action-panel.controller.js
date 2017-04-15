angular.module('microTag.core')
	.controller('ActionPanelController', actionPanelController);

function actionPanelController($scope, LoadingService, ObjectUtils) {
	activate();

	function activate() {
		$scope.loadingIndicator = LoadingService.loadingIndicator;
		$scope.inlineMode = ObjectUtils.defaultValue($scope.inlineMode, false);
		$scope.tooltipPlacement = ObjectUtils.defaultValue($scope.tooltipPlacement, "bottom");
	}
}
