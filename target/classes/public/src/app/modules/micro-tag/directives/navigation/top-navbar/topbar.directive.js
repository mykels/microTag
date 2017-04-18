angular.module('microTag')
	.directive('mtTopbar', topbarDirective);

function topbarDirective() {
	return {
		restrict: 'AE',
		scope: {
		},
		templateUrl: 'topbar.html',
		controller: 'TopbarController'
	};
}
