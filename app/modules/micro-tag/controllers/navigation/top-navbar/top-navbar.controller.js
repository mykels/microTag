angular.module('microTag')
	.controller('TopNavbarController', topNavbarController);

function topNavbarController($scope, System) {
	activate();

	function activate() {
		$scope.appName = System.appName;
		$scope.layout = System.layout;
		$scope.navbar = {Collapsed: false};
	}
}
