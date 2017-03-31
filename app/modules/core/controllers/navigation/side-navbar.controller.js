angular.module('microTag.core')
	.controller('SideNavbarController', sideNavbarController);

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
			MenuItemBuilder.build('Logs', 'ti-book')
		];
	}
}
