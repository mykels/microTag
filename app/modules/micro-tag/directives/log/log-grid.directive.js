angular.module('microTag')
	.directive('mtLogGrid', logViewerDirective);

function logViewerDirective() {
	return {
		restrict: 'AE',
		scope: {
			logFiles: '='
		},
		templateUrl: 'app/modules/micro-tag/views/log/log-grid.html',
		controller: 'LogGridController'
	};
}
