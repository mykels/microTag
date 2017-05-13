angular.module('microTag')
    .controller('StatisticsController', statisticsController);

function statisticsController($scope, Timer, MeasurementService, ObjectUtils,
                              DeviceSettingsService, SessionConfiguratorDialogService) {
    var self = this;

    $scope.handleNewSession = handleNewSession;
    $scope.closeSession = closeSession;
    $scope.onExporterReady = onExporterReady;

    activate();

    function activate() {
        initSessionHandler();
        initStatisticsData();
        initStatisticsInformation();
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
        self.stdUpperBoundIndex = 4;
        self.stdBottonBoundIndex = 5;

        self.sampleCount = 1;
        self.constantMinSamples = 10;

        $scope.statisticsData = [
            buildMultiChartPart('scatter', 'measurement', '#05ec05'),
            buildMultiChartPart('line', 'min', '#ec3327'),
            buildMultiChartPart('line', 'max', '#3d96ff'),
            buildMultiChartPart('line', 'mean', '#ff60eb'),
            buildMultiChartPart('line', 'stdUpperBound', '#ec7a59', 'dashed'),
            buildMultiChartPart('line', 'stdBottomBound', '#ec7a59', 'dashed')
        ];
    }

    function buildMultiChartPart(type, key, color, chartClass) {
        return {
            values: [],
            yAxis: 1,
            type: type,
            key: key,
            color: color,
            classed: ObjectUtils.defaultValue(chartClass, '')
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

            $scope.peak = $scope.statisticsData[self.maxIndex].values[0].y;
        });
    }

    function closeSession() {
        $scope.sessionHandler.active = false;

        if ($scope.statisticsData[self.measurementIndex].values.length > 0) {
            exportResultCsv().then(freeStatisticsResources);
        } else {
            freeStatisticsResources();
        }
    }

    function onExporterReady(exportHandler) {
        self.exportHandler = exportHandler;
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
            updateMeanChart();
            updateStdBounds();
            updateMinMaxCharts();
        });
    };

    function addMeasurementPoint(measurementPoint) {
        measurementPoint.x = self.sampleCount++;
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
        $scope.statisticsInformation.range = calculateRange();
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

    function calculateRange() {
        return $scope.statisticsInformation.max - $scope.statisticsInformation.min;
    }

    function updateMeanChart() {
        updateConstantChart(self.meanIndex, $scope.statisticsInformation.mean);
    }

    function updateStdBounds() {
        updateConstantChart(self.stdUpperBoundIndex, $scope.statisticsInformation.mean + $scope.statisticsInformation.std);
        updateConstantChart(self.stdBottonBoundIndex, $scope.statisticsInformation.mean - $scope.statisticsInformation.std);
    }

    function updateMinMaxCharts() {
        updateConstantChart(self.minIndex, $scope.statisticsData[self.minIndex].values[0].y);
        updateConstantChart(self.maxIndex, $scope.statisticsData[self.maxIndex].values[0].y);
    }

    function updateConstantChart(multiChartIndex, constantValue) {
        var measurementIndex = $scope.statisticsData[self.measurementIndex].values.length + 1;

        $scope.statisticsData[multiChartIndex].values = [];

        if (measurementIndex < self.constantMinSamples) {
            measurementIndex += self.constantMinSamples;
        }

        for (var i = 1; i <= measurementIndex; i++) {
            $scope.statisticsData[multiChartIndex].values.push({
                x: i,
                y: constantValue
            });
        }
    }

    function exportResultCsv() {
        return DeviceSettingsService.get().then(function (deviceSettings) {
            return self.exportHandler.export(calculateResultCsv(deviceSettings));
        });
    }

    function calculateResultCsv(deviceSettings) {
        return $scope.statisticsData[self.measurementIndex].values.map(function (point) {
            var statisticResult = {};

            addPointData(statisticResult, point);
            addDeviceData(statisticResult, deviceSettings);

            return statisticResult;
        });
    }

    function addPointData(statisticResult, point) {
        statisticResult.sample = point.x;
        statisticResult.reading = point.y;
    }

    function addDeviceData(statisticResult, deviceSettings) {
        statisticResult.tagId = deviceSettings.tagId;
        statisticResult.swId = deviceSettings.swId;
        statisticResult.hwId = deviceSettings.hwId;
        statisticResult.serial = deviceSettings.serial;
    }
}
