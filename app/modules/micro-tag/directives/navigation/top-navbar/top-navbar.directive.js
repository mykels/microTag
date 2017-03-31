angular.module('microTag')
	.directive('mtTopNavbar', topNavbarDirective);

function topNavbarDirective() {
	return {
		restrict: 'AE',
		scope: {
		},
		replace: true,
		templateUrl: 'app/modules/micro-tag/views/navigation/top-navbar/top-navbar.html',
		controller: 'TopNavbarController'
	};
}
