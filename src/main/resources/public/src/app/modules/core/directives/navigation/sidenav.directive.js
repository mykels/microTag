angular.module('microTag.core')
	.directive('mtSidenav', sidenavDirective);

function sidenavDirective() {
	return {
		restrict: 'AE',
		scope: {},
		transclude: true,
		templateUrl: 'src/app/modules/core/views/navigation/sidenav.html',
		controller: 'SidenavController'
	};
}
