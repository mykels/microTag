angular.module('microTag')
	.controller('ReportGridController', reportGridController);

function reportGridController($scope, uiGridConstants, MediaService) {
	activate();

	function activate() {
		initReportGrid();
	}

	function initReportGrid() {
		initColumnDefs();
		initColumnFilter();

		if (angular.isDefined($scope.reportRecords)) {
			initReportRecords();
		}
	}

	function initReportRecords() {
		$scope.reportRecords.forEach(function (reportRecord) {
			reportRecord.id = reportRecord.date;
		});
	}

	function initColumnDefs() {
		$scope.columnDefs = [
			{
				name: 'date',
				displayName: 'Date',
				visible: true,
				cellFilter: 'simpleDate',
				width: '140',
				sort: {
					direction: uiGridConstants.DESC,
					priority: 1
				}
			}, {
				name: 'result',
				displayName: 'Result',
				visible: true,
				width: '90'
			}, {
				name: 'amp',
				displayName: 'Amp',
				visible: true,
				width: '90'
			}, {
				name: 'snr',
				displayName: 'Snr',
				visible: true,
				width: '90'
			}, {
				name: 'tagId',
				displayName: 'Tag ID',
				visible: true,
				width: '90'
			}, {
				name: 'swId',
				displayName: 'S/W ID',
				visible: true,
				width: '90'
			}, {
				name: 'hwId',
				displayName: 'H/W ID',
				visible: true,
				width: '90'
			}, {
				name: 'serial',
				displayName: 'Serial',
				visible: true,
				width: '120'
			}, {
				name: 'eSignature',
				displayName: 'E-Signature',
				visible: isESignatureColumnVisible(),
				width: '600'
			}
		];
	}

	function isESignatureColumnVisible() {
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
		$scope.filteredColumns = ['name', 'result', 'amp', 'snr', 'tagId', 'swId', 'hwId', 'serial', 'eSignature'];
	}
}
