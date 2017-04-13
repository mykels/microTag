angular.module('microTag')
	.controller('MainController', mainController);

function mainController($scope, System) {
	activate();

	function activate() {
		$scope.layout = System.layout;
		$scope.isMobile = System.isMobile;
	}
}
