angular.module('microTag.core')
	.directive('mtFormField', formFieldDirective);

function formFieldDirective() {
	return {
		restrict: 'AE',
		scope: {
			fieldTitle: "@",
			fieldName: "@"
		},
		replace: true,
		transclude:true,
		templateUrl: 'form-field.html',
		controller: 'FormFieldController'
	};
}
