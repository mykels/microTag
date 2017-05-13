angular.module('microTag')
    .controller('ReportController', reportController);

function reportController($scope, currentReport, ReportService, DateUtils) {
    activate();

    function activate() {
        $scope.reportRecords = currentReport;
        $scope.downloadReport = ReportService.download;
    }


    $scope.handleRecords = function (records, startDate, endDate) {
        $scope.reportRecords = records;
        $scope.reportFileName = generateReportFileName(startDate, endDate);
    };

    function generateReportFileName(startDate, endDate) {
        return "{0}_{1}_report.csv".format(DateUtils.stringify(startDate),
            DateUtils.stringify(endDate));
    }
}
