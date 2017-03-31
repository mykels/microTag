angular.module('microTag')
	.controller('ReportController', reportController);

function reportController($scope, ReportService, LoadingService) {
	activate();

	function activate() {
		$scope.downloadReport = ReportService.download;
		$scope.loadingIndicator = LoadingService.loadingIndicator;

		$scope.startDate = {value: new Date()};
		$scope.endDate = {value: new Date()};
	}

	$scope.getReport = function (startDate, endDate) {
		ReportService.getReport(startDate, endDate).then(function (reportRecords) {
			$scope.reportRecords = reportRecords;
		});
	}


}
