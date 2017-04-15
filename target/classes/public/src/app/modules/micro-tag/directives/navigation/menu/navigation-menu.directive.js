angular.module('microTag')
	.directive('mtNavigationMenu', navigationMenuDirective);

function navigationMenuDirective() {
	return {
		restrict: 'AE',
		scope: {
		},
		replace: true,
		templateUrl: 'src/app/modules/micro-tag/views/navigation/menu/navigation-menu.html',
		controller: 'NavigationMenuController'
	};
}
