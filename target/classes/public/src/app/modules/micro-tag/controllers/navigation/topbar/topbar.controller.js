angular.module('microTag')
	.controller('TopbarController', topbarController);

function topbarController($scope, System, SidenavService, EventEmitter) {
	activate();

	function activate() {
		$scope.toggleSidenav = SidenavService.toggle;

		$scope.appName = System.appName;
		$scope.layout = System.layout;
		$scope.widgetBar = {collapsed: false};
	}

	$scope.toggleWidgetBar = function () {
		$scope.widgetBar.collapsed = !$scope.widgetBar.collapsed;
		$scope.collapseWidgetBar($scope.widgetBar.collapsed);
	};

	$scope.collapseWidgetBar = function (collapse) {
		$scope.widgetBar.collapsed = collapse;

		if ($scope.widgetBar.collapsed) {
			EventEmitter.publish('widgetBarCollapsed');
		}
	}
}
