angular.module('microTag.core')
	.directive('mtSideNavbar', sideNavbarDirective);

function sideNavbarDirective() {
	return {
		restrict: 'AE',
		scope: {
		},
		replace: true,
		templateUrl: 'app/modules/core/views/navigation/side-navbar.html',
		controller: 'SideNavbarController'
	};
}
