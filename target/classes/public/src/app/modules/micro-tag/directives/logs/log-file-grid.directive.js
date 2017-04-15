angular.module('microTag')
	.directive('mtLogFileGrid', logFileGridDirective);

function logFileGridDirective() {
	return {
		restrict: 'AE',
		scope: {
			logFiles: '='
		},
		templateUrl: 'src/app/modules/micro-tag/views/logs/log-file-grid.html',
		controller: 'LogFileGridController'
	};
}
