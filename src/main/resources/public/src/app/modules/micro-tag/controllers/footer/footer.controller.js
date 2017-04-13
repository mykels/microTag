angular.module('microTag')
	.controller('FooterController', footerController);

function footerController($scope, System, DocumentUtils, SidenavService) {
	activate();

	function activate() {
		$scope.appName = System.appName;
		$scope.year = System.year;
		$scope.toTheTop = DocumentUtils.toTheTop;
		$scope.isSidenavOpened = SidenavService.isOpened;
	}
}
