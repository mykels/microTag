angular.module('microTag')
	.controller('LogsController', logsController);

function logsController($scope, $routeParams, logFiles, Navigator, LogService, LoadingService, StringUtils, CollectionUtils) {
	activate();

	function activate() {
		$scope.logFiles = logFiles;
		$scope.logFileName = $routeParams.logFileName;
		$scope.loadingIndicator = LoadingService.loadingIndicator;

		initViewedLogs();
	}

	function initViewedLogs() {
		if (!StringUtils.isEmpty($scope.logFileName) &&
			CollectionUtils.containsByProperty($scope.logFiles, 'name', $scope.logFileName)) {
			LogService.getLogs($scope.logFileName).then(function (logs) {
				$scope.viewedLogs = logs;
			});
		} else if (!CollectionUtils.isEmpty($scope.logFiles)) {
			Navigator.navigateTo('logs', [$scope.logFiles[0].name]);
		}
	}
}
