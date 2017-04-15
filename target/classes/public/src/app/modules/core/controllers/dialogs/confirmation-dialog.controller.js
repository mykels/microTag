angular.module('microTag.core')
    .controller('ConfirmationDialogController', confirmationDialogController);

function confirmationDialogController($scope, $mdDialog, options, ObjectUtils) {
    activate();

    function activate() {
        $scope.options = options;
        $scope.options.saveLabel = ObjectUtils.defaultValue(options.saveLabel, "OK");
    }

    $scope.handleConfirm = function () {
        if (angular.isDefined($scope.options.onConfirmCallback)) {
            $scope.options.onConfirmCallback({});
        }
        $mdDialog.hide();
    };

    $scope.handleCancel = function () {
        if (angular.isDefined(options.onCancelCallback)) {
            options.onCancelCallback();
        }
        $mdDialog.cancel();
    };
}
