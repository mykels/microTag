angular.module('microTag')
	.directive('mtLogChart', logChartDirective);

function logChartDirective() {
	return {
		restrict: 'AE',
		scope: {
			chartTitle: '@',
			chartData: '=',
            chartFullHeight: '=?'
        },
		templateUrl: 'log-chart.html',
		controller: 'LogChartController'
	};
}
