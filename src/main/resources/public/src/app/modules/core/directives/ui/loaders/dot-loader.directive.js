angular.module('microTag.core')
	.directive('mtDotLoader', dotLoaderDirective);

function dotLoaderDirective() {
	return {
		restrict: 'AE',
		scope: {
		},
		templateUrl: 'dot-loader.html',
		controller: 'DotLoaderController'
	};
}
