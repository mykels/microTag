angular.module('microTag.core')
	.directive('mtTopNavbar', topNavbarDirective);

function topNavbarDirective() {
	return {
		restrict: 'AE',
		scope: {
		},
		replace: true,
		templateUrl: 'app/modules/core/views/navigation/top-navbar.html',
		controller: 'TopNavbarController'
	};
}
