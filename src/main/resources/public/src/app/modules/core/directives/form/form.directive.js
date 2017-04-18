angular.module('microTag.core')
	.directive('mtForm', formDirective);

function formDirective() {
	return {
		restrict: 'AE',
		scope: {
			formId: '@'
		},
		transclude: true,
		templateUrl: 'form.html'
	};
}
