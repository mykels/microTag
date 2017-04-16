angular.module('microTag')
    .controller('StatisticsController', statisticsController);

function statisticsController($scope, $q, $timeout, LoadingService, Timer, MeasurementService, SessionConfiguratorDialogService) {
    var self = this;

    $scope.handleNewSession = handleNewSession;
    $scope.closeSession = closeSession;

    activate();

    function activate() {
        initSessionHandler();
        initStatisticsData();
        initStatisticsInformation();
        initResultCsvProperties();
    }

    function initSessionHandler() {
        $scope.sessionHandler = {
            active: false
        };
    }

    function initStatisticsData() {
        self.measurementIndex = 0;
        self.minIndex = 1;
        self.maxIndex = 2;
        self.meanIndex = 3;
        self.stdIndex = 4;

        $scope.statisticsData = [
            buildMultiChartPart('scatter', 'measurement', '#05ec05'),
            buildMultiChartPart('line', 'min', '#ec3327'),
            buildMultiChartPart('line', 'max', '#3d96ff'),
            buildMultiChartPart('line', 'mean', '#ff60eb'),
            buildMultiChartPart('line', 'std', '#9e36ff')
        ];
    }

    function buildMultiChartPart(type, key, color) {
        return {
            values: [],
            yAxis: 1,
            type: type,
            key: key,
            color: color
        };
    }

    function initStatisticsInformation() {
        $scope.statisticsInformation = {
            mean: 0,
            min: 0,
            max: 0,
            lastReading: 0
        };
    }

    function initResultCsvProperties() {
        $scope.resultCsvHeaders = ['sample', 'reading'];
        $scope.deferredResultCsv = $q.defer();
        $scope.resultCsv = $scope.deferredResultCsv.promise;
    }

    $scope.handleChartInitialization = function (api) {
        $scope.chartApi = api;
    };

    function handleNewSession() {
        SessionConfiguratorDialogService.open({
            startCallback: startSession,
            cancelCallback: closeSession
        });
    }

    function startSession() {
        $scope.sessionHandler.active = true;
        $scope.sessionTimer = Timer.start();

        MeasurementService.getSessionPoints().then(function (measurementPoints) {
            $scope.statisticsData[self.minIndex].values = measurementPoints.minLine;
            $scope.statisticsData[self.maxIndex].values = measurementPoints.maxLine;

            $scope.maxY = $scope.statisticsData[self.maxIndex].values[0].y;
        });
    }

    function closeSession() {
        $scope.sessionHandler.active = false;

        if ($scope.statisticsData[self.measurementIndex].values.length > 0) {
            downloadResultCsv().then(freeStatisticsResources);
        } else {
            freeStatisticsResources();
        }
    }

    function freeStatisticsResources() {
        Timer.stop($scope.sessionTimer);
        initStatisticsData();
        initStatisticsInformation();
    }

    $scope.handleSingleMeasurement = function () {
        MeasurementService.getPoint().then(function (measurementPoint) {
            measurementPoint.shape = inferShapeForPoint(measurementPoint);
            addMeasurementPoint(measurementPoint);
            updateStatisticsInformation();
            addMeanPoint();
            addStdPoint();
            fixMaxAndMinLines();
            $scope.chartApi.refreshWithTimeout(100);
        });
    };

    function addMeasurementPoint(measurementPoint) {
        $scope.statisticsData[self.measurementIndex].values.push(measurementPoint);
        $scope.statisticsInformation.lastReading = measurementPoint.y;
    }

    function inferShapeForPoint(measurementPoint) {
        var min = $scope.statisticsData[self.minIndex].values[0].y;
        var max = $scope.statisticsData[self.maxIndex].values[0].y;

        if (measurementPoint.y < min) {
            return 'triangle-down';
        } else if (measurementPoint.y >= min && measurementPoint.y <= max) {
            return 'cross';
        } else {
            return 'triangle-up';
        }
    }

    function updateStatisticsInformation() {
        $scope.statisticsInformation.min = calculateMin();
        $scope.statisticsInformation.max = calculateMax();
        $scope.statisticsInformation.mean = calculateMean();
        $scope.statisticsInformation.std = calculateStd();
    }

    function calculateMin() {
        return _.min($scope.statisticsData[self.measurementIndex].values, function (point) {
            return point.y;
        }).y;
    }

    function calculateMax() {
        return _.max($scope.statisticsData[self.measurementIndex].values, function (point) {
            return point.y;
        }).y;
    }

    function calculateMean() {
        return _.reduce($scope.statisticsData[self.measurementIndex].values, function (sum, point) {
                return sum + point.y;
            }, 0) / $scope.statisticsData[self.measurementIndex].values.length;
    }

    function calculateStd() {
        var measurementPoints = $scope.statisticsData[self.measurementIndex].values.length;

        return measurementPoints > 0 ? Math.sqrt(_.reduce($scope.statisticsData[self.measurementIndex].values, function (sum, point) {
                return sum + Math.pow(point.y - $scope.statisticsInformation.mean, 2);
            }, 0) / measurementPoints) : 0;
    }

    function addMeanPoint() {
        var meanIndex = $scope.statisticsData[self.meanIndex].values.length + 1;

        $scope.statisticsData[self.meanIndex].values.push({
            x: meanIndex,
            y: $scope.statisticsInformation.mean
        });
    }

    function addStdPoint() {
        var stdIndex = $scope.statisticsData[self.stdIndex].values.length + 1;

        $scope.statisticsData[self.stdIndex].values.push({
            x: stdIndex,
            y: $scope.statisticsInformation.std
        });
    }

    // TODO: remove when find another solution
    function fixMaxAndMinLines() {
        var measurementIndex = $scope.statisticsData[self.measurementIndex].values.length;

        if (measurementIndex >= 10) {
            var min = $scope.statisticsData[self.minIndex].values[0].y;
            var max = $scope.statisticsData[self.maxIndex].values[0].y;

            $scope.statisticsData[self.minIndex].values.push({
                x: measurementIndex,
                y: min
            });

            $scope.statisticsData[self.maxIndex].values.push({
                x: measurementIndex,
                y: max
            });
        }
    }

    function downloadResultCsv() {
        LoadingService.start();
        return $timeout(function () {
            $scope.deferredResultCsv.resolve(calculateResultCsv());
            LoadingService.stop();
        }, 500);
    }

    function calculateResultCsv() {
        return $scope.statisticsData[self.measurementIndex].values.map(function (point) {
            return {
                sample: point.x,
                reading: point.y
            }
        });
    }
}
