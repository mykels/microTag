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
		templateUrl: 'form-section.html',
		controller: 'FormSectionController'
	};
}
