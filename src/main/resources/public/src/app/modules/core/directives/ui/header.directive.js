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
		templateUrl: 'header.html',
		controller: "HeaderController"
	};
}
