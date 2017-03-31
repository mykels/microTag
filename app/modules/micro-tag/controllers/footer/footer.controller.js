angular.module('microTag')
	.controller('FooterController', footerController);

function footerController($scope, System, DocumentUtils) {
	activate();

	function activate() {
		$scope.appName = System.appName;
		$scope.year = System.year;

		$scope.toTheTop = DocumentUtils.toTheTop;
	}
}
