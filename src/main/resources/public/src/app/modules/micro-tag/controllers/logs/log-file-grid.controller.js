angular.module('microTag')
	.controller('LogFileGridController', logFileGridController);

function logFileGridController($scope, uiGridConstants, ActionBuilder, LogService, MediaService, DocumentUtils, Navigator,
                               CollectionUtils, LogFileService) {
	activate();

	function activate() {
		initLogFileGrid();
	}

	function initLogFileGrid() {
		initColumnDefs();
		initColumnFilter();

		if (CollectionUtils.isNotEmpty($scope.logFiles)) {
			initLogFiles();
			initLogFilesActions();
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

		actions.push(ActionBuilder.build("Download", "btn-purple", downloadLog, false, "ti-download", true, true));
		actions.push(ActionBuilder.build("Delete", "btn-red", deleteLog, false, "ti-trash", true, true));

		logFile.actionsData = {actions: actions};
	}

	function initColumnDefs() {
		$scope.columnDefs = [
			{
				name: 'name',
				displayName: 'Name',
				visible: true,
				width: "*"
			}, {
				name: 'date',
				displayName: 'Modified',
				visible: isModifiedColumnVisible(),
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

	function isModifiedColumnVisible() {
		if (angular.isDefined($scope.gridWidth) && $scope.gridWidth > 0) {
			return $scope.gridWidth >= 440 && !MediaService.isXs();
		}

		return !MediaService.isXs();
	}

	$scope.handleGridResize = function (oldGridHeight, oldGridWidth, newGridHeight, newGridWidth) {
		$scope.gridHeight = newGridHeight;
		$scope.gridWidth = newGridWidth;
		initColumnDefs();

		return $scope.columnDefs;
	};

	function initColumnFilter() {
		$scope.filteredColumns = ['name'];
	}

	function downloadLog(logFile) {
		LogService.download([logFile.name]);
	}

	function deleteLog(logFile) {
		LogFileService.delete(logFile.name).then(DocumentUtils.reload);
	}
}
