angular.module('microTag.core')
    .directive('mtFormInputField', formInputFieldDirective);

function formInputFieldDirective() {
    return {
        restrict: 'AE',
        scope: {
            fieldTitle: "@",
            fieldName: "@",
            fieldType: "@",
            fieldModel: "=",
            isRequired: '='
        },
        replace: true,
        templateUrl: 'src/app/modules/core/views/form/form-input-field.html',
        controller: 'FormInputFieldController'
    };
}
