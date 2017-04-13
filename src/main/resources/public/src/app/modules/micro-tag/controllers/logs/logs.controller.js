angular.module('microTag')
	.controller('LogsController', logsController);

function logsController($scope, $routeParams, logFiles, LogService, LogFileService, LoadingService,
                        DocumentUtils, StringUtils, CollectionUtils) {
	activate();

	function activate() {
		$scope.logFiles = logFiles;
		$scope.loadingIndicator = LoadingService.loadingIndicator;
		$scope.logFileName = $routeParams.logFileName;

		initGroupActions();
		initViewedLogs();
	}

	function initGroupActions() {
		$scope.logGroupActions = [
			{name: "Download", callback: downloadLog, map: getLogName},
			{
				name: "Delete",
				loadingIndicator: $scope.loadingIndicator,
				groupLoadingText: "Deleting pages...",
				callback: deletePage,
				onFinishCallback: afterDeletePage
			}
		]
	}

	function getLogName(logFile) {
		return logFile.name;
	}

	function downloadLog(logFileNames) {
		LogService.download(logFileNames);
	}

	function deletePage(logFile) {
		console.log("deleting page...");
		return LogFileService.delete(logFile.name);
	}

	function afterDeletePage() {
		console.log("after deleting page...");
		DocumentUtils.reload();
	}

	function initViewedLogs() {
		if (StringUtils.isNotEmpty($scope.logFileName)) {
			$scope.viewedLogFile = $scope.logFileName;
		} else if (CollectionUtils.isNotEmpty(logFiles)) {
			$scope.viewedLogFile = logFiles[0].name;
		} else {
			return;
		}

		LogService.getLogs($scope.viewedLogFile).then(function (logResponse) {
			$scope.viewedLogs = logResponse.logs;
		});

	}
}
