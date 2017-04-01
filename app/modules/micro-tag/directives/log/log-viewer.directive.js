angular.module('microTag')
	.directive('mtLogViewer', logViewerDirective);

function logViewerDirective() {
	return {
		restrict: 'AE',
		scope: {
			logs: '='
		},
		templateUrl: 'app/modules/micro-tag/views/log/log-viewer.html',
		controller: 'LogViewerController'
	};
}
