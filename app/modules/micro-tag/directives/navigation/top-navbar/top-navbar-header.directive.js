angular.module('microTag')
	.directive('mtTopNavbarHeader', topNavbarHeaderDirective);

function topNavbarHeaderDirective() {
	return {
		restrict: 'AE',
		scope: {
		},
		replace: true,
		templateUrl: 'app/modules/micro-tag/views/navigation/top-navbar/top-navbar-header.html',
		controller: 'TopNavbarHeaderController'
	};
}
