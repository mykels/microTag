angular.module('microTag')
    .controller('LineChartController', lineChartController);

function lineChartController($scope, EventEmitter) {
    activate();

    function activate() {
        initOptions();
        initDefaults();
        registerEventListeners();
    }

    function registerEventListeners() {
        EventEmitter.subscribe('sidenavOpened', repaintGraph);
        EventEmitter.subscribe('sidenavClosed', repaintGraph);
        EventEmitter.subscribe('widgetBarCollapsed', repaintGraph);
    }

    function initOptions() {
        $scope.options = {
            chart: {
                type: 'lineChart',
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
                callback: function (chart) {
                    console.info("statistics chart is ready!");
                }
            }
        };
    }

    function initDefaults() {
        if (angular.isDefined($scope.chartFullHeight) && !$scope.chartFullHeight) {
            $scope.options.chart.height = 450;
        }
    }

    function repaintGraph() {
        if (angular.isDefined($scope.api)) {
            $scope.api.update();
        }
    }

    $scope.handleWindowResize = function (height) {
        repaintGraph();
    };
}
