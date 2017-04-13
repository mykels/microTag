angular.module('microTag.core')
	.directive('mtFormSection', formSectionDirective);

function formSectionDirective() {
	return {
		restrict: 'AE',
		scope: {
			sectionTitle: '@'
		},
		replace: true,
		transclude: true,
		templateUrl: 'src/app/modules/core/views/form/form-section.html',
		controller: 'FormSectionController'
	};
}
