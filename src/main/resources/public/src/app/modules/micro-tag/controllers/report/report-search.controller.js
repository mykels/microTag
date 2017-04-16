angular.module('microTag')
	.controller('ReportSearchController', reportSearchController);

function reportSearchController($scope, ReportService, LoadingService) {
	activate();

	function activate() {
		$scope.loadingIndicator = LoadingService.loadingIndicator;

		$scope.startDate = {value: new Date()};
		$scope.endDate = {value: new Date()};
		$scope.endDatePickerOptions = {
			minDate: $scope.startDate.value
		};
	}

	$scope.getReport = function (startDate, endDate) {
		ReportService.getReport(startDate, endDate).then(function (reportRecords) {
			if (angular.isDefined($scope.reportResultCallback)) {
				$scope.reportResultCallback({
					records: reportRecords,
					startDate: startDate,
					endDate: endDate
				});
			}
		});
	};

	function onStartDateChange(newStartDateValue) {
		if (angular.isDefined(newStartDateValue)) {
			$scope.endDatePickerOptions.minDate = newStartDateValue;
		}
	}

	$scope.$watch("startDate.value", onStartDateChange);
}
