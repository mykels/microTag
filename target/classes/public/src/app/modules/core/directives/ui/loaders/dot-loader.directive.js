angular.module('microTag.core')
	.directive('mtDotLoader', dotLoaderDirective);

function dotLoaderDirective() {
	return {
		restrict: 'AE',
		scope: {
		},
		templateUrl: 'src/app/modules/core/views/ui/loaders/dot-loader.html',
		controller: 'DotLoaderController'
	};
}
