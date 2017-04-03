angular.module('microTag')
	.controller('LogGridController', logGridController);

function logGridController($scope, $route, uiGridConstants, ActionBuilder, LogService, Navigator) {
	activate();

	function activate() {
		initLogFileGrid();
	}

	function initLogFileGrid() {
		initColumnDefs();
		initColumnFilter();

		if (angular.isDefined($scope.logFiles)) {
			initLogFiles();
			initLogFilesActions();
			initLogFileFunctions()
		}
	}

	function initLogFiles() {
		$scope.logFiles.forEach(function (logFile) {
			logFile.id = logFile.name;
		});
	}

	function initLogFilesActions() {
		if (!$scope.readOnly) {
			$scope.logFiles.forEach(function (logFile) {
				initLogFileActions(logFile);
			});
		}
	}

	function initLogFileActions(logFile) {
		if (angular.isUndefined(logFile)) {
			return;
		}

		var actions = [];

		actions.push(ActionBuilder.build("Download", "btn-purple", downloadLogFile, false, "ti-download", true, true));
		actions.push(ActionBuilder.build("Delete", "btn-red", deleteLogFile, false, "ti-trash", true, true));

		logFile.actionsData = {actions: actions};
	}

	function initColumnDefs() {
		$scope.columnDefs = [
			{
				name: 'name',
				displayName: 'Name',
				visible: true,
				width: "*",
				cellTemplate: "<a class='aura-grid-column' ng-href='#' ng-click='row.entity.navigateTo(row.entity.name)'>{{COL_FIELD}}</a>"
			}, {
				name: 'date',
				displayName: 'Modified',
				visible: true,
				cellFilter: 'simpleDate',
				width: "140",
				sort: {
					direction: uiGridConstants.DESC,
					priority: 1
				}
			}, {
				name: 'actionData',
				displayName: 'Actions',
				enableSorting: false,
				enableColumnMenu: false,
				width: "100",
				cellTemplate: '<mt-action-panel action-data="row.entity.actionsData" action-context="row.entity"></mt-action-panel>'
			}
		];
	}

	function initColumnFilter() {
		$scope.filteredColumns = ['name'];
	}

	function initLogFileFunctions() {
		$scope.logFiles.forEach(function (logFile) {
			logFile.navigateTo = navigateToLogFile;
		});
	}

	function navigateToLogFile(logFileName) {
		Navigator.navigateTo('logs', {
			'logFileName': logFileName
		});
	}

	function downloadLogFile(logFile) {
		LogService.download(logFile);
	}

	function deleteLogFile(logFile) {
		LogService.delete(logFile).then(function () {
			$route.reload();
		});
	}
}
