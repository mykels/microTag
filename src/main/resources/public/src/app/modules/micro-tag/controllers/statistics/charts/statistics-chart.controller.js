angular.module('microTag')
    .controller('StatisticsChartController', statisticsChartController);

function statisticsChartController($scope, EventEmitter) {
    activate();

    function activate() {
        initOptions();
        initConfig();
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
                    if (angular.isDefined($scope.chartInitCallback)) {
                        $scope.chartInitCallback({api: $scope.api});
                    }
                }
            }
        };
    }

    function initConfig() {
        $scope.config = {
            refreshDataOnly: true,
            deepWatchOptions: true,
            deepWatchData: false,
            deepWatchDataDepth: 0,
            debounce: 100
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
        return $scope.maxY + 500;
    }
}
