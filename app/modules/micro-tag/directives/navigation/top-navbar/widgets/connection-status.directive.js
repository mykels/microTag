angular.module('microTag')
	.directive('mtConnectionStatus', connectionStatusDirective);

function connectionStatusDirective() {
	return {
		restrict: 'AE',
		scope: {
		},
		replace: true,
		templateUrl: 'app/modules/micro-tag/views/navigation/top-navbar/widgets/connection-status.html',
		controller: 'ConnectionStatusController'
	};
}
