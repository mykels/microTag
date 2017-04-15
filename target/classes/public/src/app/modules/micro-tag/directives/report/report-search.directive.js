angular.module('microTag')
	.directive('mtReportSearch', reportSearchDirective);

function reportSearchDirective() {
	return {
		restrict: 'AE',
		scope: {
			reportResultCallback: '&'
		},
		replace: true,
		templateUrl: 'src/app/modules/micro-tag/views/report/report-search.html',
		controller: 'ReportSearchController'
	};
}
