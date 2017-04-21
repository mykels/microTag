angular.module('microTag')
    .controller('StatisticsChartController', statisticsChartController);

function statisticsChartController($scope, EventEmitter) {
    activate();

    function activate() {
        initOptions();
        initDefaults();
        registerEventListeners();
    }

    function registerEventListeners() {
        EventEmitter.subscribe('sidenavOpened', repaintChart);
        EventEmitter.subscribe('sidenavClosed', repaintChart);
        EventEmitter.subscribe('widgetBarCollapsed', repaintChart);
    }

    function initOptions() {
        $scope.options = {
            chart: {
                type: 'multiChart',
                margin: {
                    top: 20,
                    right: 40,
                    bottom: 40,
                    left: 55
                },
                x: function (d) {
                    return d.x;
                },
                y: function (d) {
                    return d.y;
                },
                useInteractiveGuideline: false,
                staggerLabels: true,
                showLegend: false,
                useVoronoi: true,
                showValues: true,
                xAxis: {
                    axisLabel: 'Sample #'
                },
                yAxis1: {
                    axisLabel: 'Reading',
                    tickFormat: function (d) {
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: 30
                },
                yDomain1: ([0, calculatePeak()]),
                callback: function (chart) {
                    console.info("statistics chart is ready!");
                }
            }
        };
    }

    function initDefaults() {
        if (angular.isUndefined($scope.chartFullHeight) ||
            (angular.isDefined($scope.chartFullHeight) && !$scope.chartFullHeight)) {
            $scope.options.chart.height = 450;
        }
    }

    function repaintChart() {
        console.info("repainting chart");

        if (angular.isDefined($scope.api)) {
            $scope.api.updateWithTimeout(100);
        }
    }

    function calculatePeak() {
        return angular.isDefined($scope.peak) ? $scope.peak + 500 : 5000;
    }


    function handleChartDataChange() {
        console.info("updating chart data");

        if (angular.isDefined($scope.api)) {
            $scope.api.refreshWithTimeout(100);
        }
    }

    $scope.$watch("chartData", handleChartDataChange, true);
    $scope.$watch("peak", repaintChart, true);
}
