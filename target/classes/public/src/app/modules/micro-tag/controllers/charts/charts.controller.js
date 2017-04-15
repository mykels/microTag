angular.module('microTag')
	.controller('ChartsController', chartsController);

function chartsController($scope, chartLogs) {
	activate();

	function activate() {
		$scope.chartLogs = chartLogs;
	}
}
