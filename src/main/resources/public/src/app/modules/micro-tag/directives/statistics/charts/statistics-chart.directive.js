angular.module('microTag')
    .directive('mtStatisticsChart', statisticsChartDirective);

function statisticsChartDirective() {
    return {
        restrict: 'AE',
        scope: {
            chartTitle: '@',
            chartData: '=',
            chartInitCallback: '&',
            maxY: '='
        },
        templateUrl: 'src/app/modules/micro-tag/views/statistics/charts/statistics-chart.html',
        controller: 'StatisticsChartController'
    };
}
