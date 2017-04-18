angular.module('microTag')
	.directive('mtMenuItem', menuItemDirective);

function menuItemDirective() {
	return {
		restrict: 'AE',
		scope: {
			menuItem: '='
		},
		replace: true,
		templateUrl: 'menu-item.html',
		controller: 'MenuItemController'
	};
}
