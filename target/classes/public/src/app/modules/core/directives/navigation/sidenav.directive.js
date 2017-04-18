angular.module('microTag.core')
	.directive('mtSidenav', sidenavDirective);

function sidenavDirective() {
	return {
		restrict: 'AE',
		scope: {},
		transclude: true,
		templateUrl: 'sidenav.html',
		controller: 'SidenavController'
	};
}
