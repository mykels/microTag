angular.module('microTag')
    .directive('mtLineChart', lineChartDirective);

function lineChartDirective() {
    return {
        restrict: 'AE',
        scope: {
            chartData: '=',
            chartPadding: '@'
        },
        templateUrl: 'line-chart.html',
        controller: 'LineChartController'
    };
}
