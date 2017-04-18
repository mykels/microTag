angular.module('microTag')
	.directive('mtConnectionStatus', connectionStatusDirective);

function connectionStatusDirective() {
	return {
		restrict: 'AE',
		scope: {
            onReconnect: "&"
		},
		replace: true,
		templateUrl: 'connection-status.html',
		controller: 'ConnectionStatusController'
	};
}
