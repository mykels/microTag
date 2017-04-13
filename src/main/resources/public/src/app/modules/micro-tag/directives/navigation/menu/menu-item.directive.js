angular.module('microTag')
	.directive('mtMenuItem', menuItemDirective);

function menuItemDirective() {
	return {
		restrict: 'AE',
		scope: {
			menuItem: '='
		},
		replace: true,
		templateUrl: 'src/app/modules/micro-tag/views/navigation/menu/menu-item.html',
		controller: 'MenuItemController'
	};
}
