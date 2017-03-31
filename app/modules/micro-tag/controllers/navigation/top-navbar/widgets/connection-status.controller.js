angular.module('microTag')
	.controller('ConnectionStatusController', connectionStatusController);

function connectionStatusController($scope, $timeout) {
	activate();

	function activate() {
		$scope.status = {connected: true};

		$timeout(function () {
			$scope.status.connected = false;
			$timeout(function () {
				$scope.status.connected = true;
			}, 5000);
		}, 2000);
	}
}
