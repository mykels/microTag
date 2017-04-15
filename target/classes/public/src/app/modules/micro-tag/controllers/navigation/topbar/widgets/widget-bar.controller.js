angular.module('microTag')
	.controller('WidgetBarController', widgetBarController);

function widgetBarController($scope, EventEmitter) {
	activate();

	function activate() {
		collapse(false);
		registerEventListeners();
	}

	function registerEventListeners() {
		EventEmitter.subscribe('sidenavIsOpening', handleSidenavIsOpening);
	}

	function handleSidenavIsOpening() {
		collapse(false);
	}

	function collapse(collapse) {
		if (angular.isDefined($scope.collapseWidgetBar)) {
			$scope.collapseWidgetBar({collapse: collapse});
		}
	}

	$scope.collapse = collapse;
}
