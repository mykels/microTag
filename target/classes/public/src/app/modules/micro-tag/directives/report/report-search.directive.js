angular.module('microTag')
	.directive('mtReportSearch', reportSearchDirective);

function reportSearchDirective() {
	return {
		restrict: 'AE',
		scope: {
			reportResultCallback: '&'
		},
		replace: true,
		templateUrl: 'report-search.html',
		controller: 'ReportSearchController'
	};
}
