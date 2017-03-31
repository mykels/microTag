angular.module('microTag')
	.controller('MenuItemController', menuItemController);

function menuItemController($scope, $location, Navigator, StringUtils) {
	activate();

	function activate() {
		$scope.navigateTo = Navigator.navigateTo;
	}

	$scope.isActiveRoute = function (link) {
		return StringUtils.contains($location.path(), link, true);
	}
}
