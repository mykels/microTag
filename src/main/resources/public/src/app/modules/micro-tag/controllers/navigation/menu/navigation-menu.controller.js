angular.module('microTag')
	.controller('NavigationMenuController', sideNavbarController);

function sideNavbarController($scope, MenuItemBuilder) {
	activate();

	function activate() {
		$scope.navSearch = {value: ''};
		initMenuItems();
	}

	function initMenuItems() {
		$scope.menuItems = [
			MenuItemBuilder.build('Terminal', 'ti-tablet'),
			MenuItemBuilder.build('Settings', 'ti-settings'),
			MenuItemBuilder.build('Report', 'ti-printer'),
			MenuItemBuilder.build('Logs', 'ti-book'),
			MenuItemBuilder.build('Charts', 'ti-bar-chart'),
			MenuItemBuilder.build('Measurement', 'ti-ruler'),
			MenuItemBuilder.build('Statistics', 'ti-pie-chart')
		];
	}
}
