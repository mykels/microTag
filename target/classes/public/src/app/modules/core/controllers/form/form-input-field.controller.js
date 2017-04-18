angular.module('microTag.core')
    .controller('FormInputFieldController', formInputFieldController);

function formInputFieldController($scope, ObjectUtils) {
    activate();

    function activate() {
        $scope.required = ObjectUtils.defaultValue($scope.isRequired, true);
    }
}
