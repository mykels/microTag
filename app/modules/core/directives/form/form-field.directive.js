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
		templateUrl: 'app/modules/core/views/form/form-field.html',
		controller: 'FormFieldController'
	};
}
