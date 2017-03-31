angular.module('microTag.core')
	.directive('mtFormInputField', formInputFieldDirective);

function formInputFieldDirective() {
	return {
		restrict: 'AE',
		scope: {
			fieldTitle: "@",
			fieldName: "@",
			fieldType: "@",
			fieldModel: "="
		},
		replace: true,
		templateUrl: 'app/modules/core/views/form/form-input-field.html',
		controller: 'FormInputFieldController'
	};
}
