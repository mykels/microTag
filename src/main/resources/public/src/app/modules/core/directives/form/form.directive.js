angular.module('microTag.core')
	.directive('mtForm', formDirective);

function formDirective() {
	return {
		restrict: 'AE',
		scope: {
			formId: '@'
		},
		transclude: true,
		templateUrl: 'src/app/modules/core/views/form/form.html'
	};
}
