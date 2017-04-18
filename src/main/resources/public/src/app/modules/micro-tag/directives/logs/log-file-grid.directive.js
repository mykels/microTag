angular.module('microTag')
	.directive('mtLogFileGrid', logFileGridDirective);

function logFileGridDirective() {
	return {
		restrict: 'AE',
		scope: {
			logFiles: '='
		},
		templateUrl: 'log-file-grid.html',
		controller: 'LogFileGridController'
	};
}
