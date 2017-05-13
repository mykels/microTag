angular.module('microTag.core')
    .controller('CsvExporterController', csvExporterController);

function csvExporterController($scope, $q) {
    var self = this;

    activate();

    function activate() {
        initResultPromise();
    }

    function initResultPromise() {
        self.deferredExportedData = $q.defer();
        $scope.exportedData = self.deferredExportedData.promise;

        self.exportHandlerContainer = {
            exportHandler: {
                export: exportCsv
            }
        };

        if (angular.isDefined($scope.onExporterReady)) {
            $scope.onExporterReady(self.exportHandlerContainer);
        }
    }

    function exportCsv(result) {
        self.deferredExportedData.resolve(result);
        return $scope.exportedData;
    }
}
