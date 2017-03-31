angular.module('microTag.core')
	.controller('MenuItemController', menuItemController);

function menuItemController($scope, Navigator) {
	activate();

	function activate() {
		$scope.navigateTo = Navigator.navigateTo;
	}
}
