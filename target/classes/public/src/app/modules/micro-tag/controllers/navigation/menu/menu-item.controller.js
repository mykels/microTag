angular.module('microTag')
	.controller('MenuItemController', menuItemController);

function menuItemController($scope, $location, Navigator, MediaService, SidenavService, StringUtils) {
	activate();

	function activate() {
	}

	$scope.isActiveRoute = function (link) {
		return StringUtils.contains($location.path(), link, true);
	};

	$scope.handleNavigation = function (link) {
		if (MediaService.isXs()) {
			SidenavService.toggle();
		}

		Navigator.navigateTo(link);
	};
}
