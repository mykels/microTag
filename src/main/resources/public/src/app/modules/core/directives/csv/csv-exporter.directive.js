angular.module('microTag.core')
    .directive('mtCsvExporter', csvExporterDirective);

function csvExporterDirective() {
    return {
        restrict: 'AE',
        scope: {
            exportedHeader: '=',
            exportedFilename: '@',
            exportedClass: '@',
            onExporterReady: '&',
            onClick: '&'
        },
        replace: false,
        transclude: true,
        templateUrl: 'csv-exporter.html',
        controller: 'CsvExporterController'
    };
}
