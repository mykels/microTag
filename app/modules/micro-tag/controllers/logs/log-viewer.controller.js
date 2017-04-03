angular.module('microTag')
	.controller('LogViewerController', logViewerController);

function logViewerController($scope, LogLevels, StringUtils) {
	activate();

	function activate() {
		$scope.logLevels = LogLevels.values;
		$scope.logLevel = {value: LogLevels.default};
		$scope.logTopIndex = {value: 0};
		$scope.logFilter = {value: ""};

		initDynamicLogs();
	}

	function initDynamicLogs() {
		var DynamicLogs = function () {
			this.loadedLogs = angular.copy($scope.logs);
			this.logCount = $scope.logs.length;
		};

		DynamicLogs.prototype.getItemAtIndex = function (index) {
			return this.loadedLogs[index];
		};

		DynamicLogs.prototype.getLength = function () {
			return this.logCount;
		};

		$scope.dynamicLogs = new DynamicLogs();
	}

	function handleLogFilter(filterValue) {
		if (angular.isUndefined(filterValue)) {
			return;
		}

		$scope.dynamicLogs.loadedLogs = [];
		$scope.dynamicLogs.loadedLogs = _.filter($scope.logs, function (logLine) {
			return StringUtils.contains(logLine.value, filterValue);
		});

		$scope.dynamicLogs.logCount = $scope.dynamicLogs.loadedLogs.length;
	}

	$scope.handleGoToBeginning = function () {
		$scope.logTopIndex.value = 0;
	};

	$scope.handleGoToEnd = function () {
		$scope.logTopIndex.value = $scope.dynamicLogs.logCount;
	};

	$scope.$watch("logFilter.value", handleLogFilter);
}
