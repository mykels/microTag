angular.module('microTag.core')
    .controller('FormDialogController', formDialogController);

function formDialogController($scope, ObjectUtils, $mdDialog) {
    activate();

    function activate() {
        $scope.saveAllowed = ObjectUtils.defaultValue($scope.saveAllowed, true);
        $scope.saveLabel = ObjectUtils.defaultValue($scope.saveLabel, "Save");
        $scope.saveClass = ObjectUtils.defaultValue($scope.saveClass, "btn-primary");
        $scope.cancelLabel = ObjectUtils.defaultValue($scope.cancelLabel, "Cancel");
        $scope.cancelClass = ObjectUtils.defaultValue($scope.cancelClass, "btn-default");
        $scope.cancelVisible = ObjectUtils.defaultValue($scope.cancelVisible, true);
        $scope.saveVisible = ObjectUtils.defaultValue($scope.saveVisible, true);
        $scope.warningDialog = ObjectUtils.defaultValue($scope.warningDialog, false);
    }

    $scope.handleSave = function () {
        if (angular.isDefined($scope.saveCallback)) {
            $scope.saveCallback({});
        } else {
            $mdDialog.hide();
        }
    };

    $scope.handleCancel = function () {
        if (angular.isDefined($scope.cancelCallback)) {
            $scope.cancelCallback({});
        }

        $mdDialog.cancel();
    };
}
