angular.module('microTag')
	.directive('mtTopbar', topbarDirective);

function topbarDirective() {
	return {
		restrict: 'AE',
		scope: {
		},
		templateUrl: 'src/app/modules/micro-tag/views/navigation/topbar/topbar.html',
		controller: 'TopbarController'
	};
}
