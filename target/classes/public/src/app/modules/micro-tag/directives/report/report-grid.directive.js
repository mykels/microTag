angular.module('microTag')
	.directive('mtReportGrid', logViewerDirective);

function logViewerDirective() {
	return {
		restrict: 'AE',
		scope: {
			reportRecords: '=',
			reportFileName: '@'
		},
		templateUrl: 'src/app/modules/micro-tag/views/report/report-grid.html',
		controller: 'ReportGridController'
	};
}
