angular.module('microTag')
	.directive('mtSideNavbar', sideNavbarDirective);

function sideNavbarDirective() {
	return {
		restrict: 'AE',
		scope: {
		},
		replace: true,
		templateUrl: 'app/modules/micro-tag/views/navigation/side-navbar/side-navbar.html',
		controller: 'SideNavbarController'
	};
}
