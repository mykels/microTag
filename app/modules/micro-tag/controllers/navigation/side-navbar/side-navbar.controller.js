angular.module('microTag')
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
			MenuItemBuilder.build('Report', 'ti-blackboard'),
			MenuItemBuilder.build('Logs', 'ti-book'),
			MenuItemBuilder.build('Charts', 'ti-bar-chart')
		];
	}
}
