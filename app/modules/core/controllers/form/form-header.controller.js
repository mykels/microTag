angular.module('microTag.core')
	.controller('FormHeaderController', formHeaderController);

function formHeaderController($scope, LoadingService) {
	activate();

	function activate() {
		$scope.loadingIndicator = LoadingService.loadingIndicator;
	}

	$scope.handleSave = function () {
		if (angular.isDefined($scope.saveCallback)) {
			$scope.saveCallback({});
		}
	};

	$scope.handleReset = function () {
		if (angular.isDefined($scope.resetCallback)) {
			$scope.resetCallback({});
		}
	};
}
