angular.module('microTag.core')
    .directive('mtFormInputField', formInputFieldDirective);

function formInputFieldDirective() {
    return {
        restrict: 'AE',
        scope: {
            fieldTitle: '@',
            fieldName: '@',
            fieldType: '@',
            fieldModel: '=',
            isRequired: '=',
            fieldDisabled: '=?',
            fieldTranslate: '=?'
        },
        replace: true,
        templateUrl: 'form-input-field.html',
        controller: 'FormInputFieldController'
    };
}
