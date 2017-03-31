angular.module('microTag')
	.controller('TopNavbarHeaderController', topNavbarHeaderController);

function topNavbarHeaderController($scope, System) {
	activate();

	function activate() {
		$scope.appName = System.appName;
		$scope.layout = System.layout;
		$scope.navbar = {Collapsed: false};
	}
}
