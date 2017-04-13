angular.module('microTag.core')
	.controller('SidenavController', sidenavController);

function sidenavController($scope, SidenavService) {
	activate();

	function activate() {
		$scope.sidenavId = SidenavService.sidenavId;
	}
}
