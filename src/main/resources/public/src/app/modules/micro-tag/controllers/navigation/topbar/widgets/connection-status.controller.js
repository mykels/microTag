angular.module('microTag')
	.controller('ConnectionStatusController', connectionStatusController);

function connectionStatusController($scope, LoadingService, DeviceConnectionService) {
	activate();

	function activate() {
		$scope.loadingIndicator = LoadingService.loadingIndicator;
		$scope.status = DeviceConnectionService.status;
	}

	$scope.handleReconnection = function () {
		DeviceConnectionService.reconnect();
	}
}
