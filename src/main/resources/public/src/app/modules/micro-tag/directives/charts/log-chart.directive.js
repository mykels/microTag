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
		templateUrl: 'src/app/modules/micro-tag/views/charts/log-chart.html',
		controller: 'LogChartController'
	};
}
