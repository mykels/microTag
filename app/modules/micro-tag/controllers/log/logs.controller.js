angular.module('microTag')
	.controller('LogsController', logsController);

function logsController($scope, $routeParams, logFiles, LogService, LoadingService, StringUtils, CollectionUtils) {
	activate();

	function activate() {
		$scope.logFiles = logFiles;
		$scope.logFileName = $routeParams.logFileName;
		$scope.loadingIndicator = LoadingService.loadingIndicator;

		initViewedLogs();
	}

	function initViewedLogs() {
		if (!StringUtils.isEmpty($scope.logFileName)) {
			LogService.getLogs($scope.logFileName).then(function (logs) {
				$scope.viewedLogs = logs;
			});
		} else if (!CollectionUtils.isEmpty($scope.logFiles)) {
			LogService.getLogs($scope.logFiles[0].name).then(function (logs) {
				$scope.viewedLogs = logs;
			});
		}
	}
}
