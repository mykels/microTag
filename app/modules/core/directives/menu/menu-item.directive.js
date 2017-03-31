angular.module('microTag.core')
	.directive('mtMenuItem', menuItemDirective);

function menuItemDirective() {
	return {
		restrict: 'AE',
		scope: {
			menuItem: '='
		},
		replace: true,
		templateUrl: 'app/modules/core/views/menu/menu-item.html',
		controller: 'MenuItemController'
	};
}
