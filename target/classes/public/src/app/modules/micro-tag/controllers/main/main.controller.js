angular.module('microTag')
	.controller('MainController', mainController);

function mainController($scope, System, EventEmitter, MediaService) {
	activate();

	function activate() {
		$scope.layout = System.layout;
		$scope.isMobile = System.isMobile;
		registerEventListeners();
	}

	function registerEventListeners() {
		EventEmitter.subscribe('sidenavOpened', handleSidenavOpened);
		EventEmitter.subscribe('sidenavClosed', handleSidenavClosed);
	}

	function handleSidenavOpened() {
		if (MediaService.isXs()) {
			$scope.layout.mainContentVisible = false;
		}
	}

	function handleSidenavClosed() {
		if (!$scope.layout.mainContentVisible) {
			$scope.layout.mainContentVisible = true;
		}
	}
}
