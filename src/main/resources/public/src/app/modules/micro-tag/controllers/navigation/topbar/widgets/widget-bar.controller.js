angular.module('microTag')
	.controller('WidgetBarController', widgetBarController);

function widgetBarController($scope, EventEmitter) {
	activate();

	function activate() {
		collapse(false);
		registerEventListeners();
	}

	function registerEventListeners() {
		EventEmitter.subscribe('sidenavOpened', handleSidenavOpened);
	}

	function handleSidenavOpened() {
		collapse(false);
	}

	function collapse(collapse) {
		if (angular.isDefined($scope.collapseWidgetBar)) {
			$scope.collapseWidgetBar({collapse: collapse});
		}
	}

	$scope.collapse = collapse;
}
