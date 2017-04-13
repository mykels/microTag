angular.module('microTag')
	.directive('mtConnectionStatus', connectionStatusDirective);

function connectionStatusDirective() {
	return {
		restrict: 'AE',
		scope: {
		},
		replace: true,
		templateUrl: 'src/app/modules/micro-tag/views/navigation/topbar/widgets/connection-status.html',
		controller: 'ConnectionStatusController'
	};
}
