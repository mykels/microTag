angular.module('microTag')
	.controller('MainContentController', mainContentController);

function mainContentController($scope, SidenavService) {
	activate();

	function activate() {
		$scope.isSidenavOpened = SidenavService.isOpened;
	}
}
