angular.module('microTag')
    .directive('mtStatisticsChart', statisticsChartDirective);

function statisticsChartDirective() {
    return {
        restrict: 'AE',
        scope: {
            chartTitle: '@',
            chartData: '=',
            peak: '='
        },
        templateUrl: 'statistics-chart.html',
        controller: 'StatisticsChartController'
    };
}
