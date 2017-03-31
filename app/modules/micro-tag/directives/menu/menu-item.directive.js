angular.module('microTag')
	.directive('mtMenuItem', menuItemDirective);

function menuItemDirective() {
	return {
		restrict: 'AE',
		scope: {
			menuItem: '='
		},
		replace: true,
		templateUrl: 'app/modules/micro-tag/views/menu/menu-item.html',
		controller: 'MenuItemController'
	};
}
