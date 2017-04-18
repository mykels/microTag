angular.module('microTag')
	.directive('mtNavigationMenu', navigationMenuDirective);

function navigationMenuDirective() {
	return {
		restrict: 'AE',
		scope: {
		},
		replace: true,
		templateUrl: 'navigation-menu.html',
		controller: 'NavigationMenuController'
	};
}
