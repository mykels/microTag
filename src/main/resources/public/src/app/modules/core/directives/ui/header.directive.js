angular.module('microTag.core')
	.directive('mtHeader', headerDirective);

function headerDirective() {
	return {
		restrict: 'AE',
		scope: {
			headerTitle: '@'
		},
		transclude: true,
		replace: false,
		templateUrl: 'src/app/modules/core/views/ui/header.html',
		controller: "HeaderController"
	};
}
