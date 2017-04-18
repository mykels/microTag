angular.module('microTag')
	.directive('mtReportGrid', logViewerDirective);

function logViewerDirective() {
	return {
		restrict: 'AE',
		scope: {
			reportRecords: '=',
			reportFileName: '@'
		},
		templateUrl: 'report-grid.html',
		controller: 'ReportGridController'
	};
}
